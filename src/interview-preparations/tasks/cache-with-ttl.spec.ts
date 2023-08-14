/**
 * Your task is to implement a TTL (Time-to-Live) cache in Node.js. The cache should have the following features:
 *
 * The cache should hold a configurable number of key-value pairs.
 * When the maximum number of pairs has been reached, the cache should evict the oldest pair to make space for a new pair.
 * Each key-value pair should have the same TTL value which is defined globally and specifies the maximum time in milliseconds that a pair can stay in the cache.
 * If a key-value pair exceeds its TTL, it should be automatically evicted from the cache.
 * The cache should support the set(key, value) and get(key) operations.
 * The set(key, value) operation should add a new key-value pair to the cache. If the cache is already full, the oldest pair should be evicted.
 * The get(key) operation should retrieve the value for a given key from the cache. If the key is not found, null should be returned.
 */

/**
 * Global TTL configuration
 */
const GLOBAL_TTL_MS = 3;

/**
 * TTL Cache implementation
 */
class TTLCacheImpl<Key = string, Value = unknown> {
  public static defaultSize = 5;

  public static maxCacheSizeError = new Error(
    "maxCacheSize must be a positive number"
  );

  public get size() {
    return this._cache.size;
  }

  public get maxCacheSize() {
    return this._maxCacheSize;
  }

  private _cache = new Map<
    Key,
    {
      value: Value;
      createdAt: number;
    }
  >();

  constructor(private _maxCacheSize: number = TTLCacheImpl.defaultSize) {
    if (this._maxCacheSize <= 0) {
      throw TTLCacheImpl.maxCacheSizeError;
    }
  }

  public set(key: Key, value: Value) {
    if (this._cache.has(key)) {
      this._cache.delete(key);
    } else if (this._cache.size >= this._maxCacheSize) {
      this._cache.delete(this._cache.keys().next().value);
    }
    this._cache.set(key, {
      value,
      createdAt: performance.now(),
    });
  }

  public get(key: Key) {
    const cacheEntry = this._cache.get(key);

    if (!cacheEntry) {
      return null;
    }

    /**
     * I decided to implement lazy invalidation of the cache.
     * It allows to prevent inaccurate timers issue and reduce the number of bg ops.
     *
     * I don't see possible effects which can be caused by this approach,
     * the entries would be either evicted on get() or evicted by cache size limit.
     */
    if (performance.now() - cacheEntry.createdAt > GLOBAL_TTL_MS) {
      this._cache.delete(key);
      return null;
    }

    return cacheEntry.value;
  }

  public invalidate() {
    this._cache.clear();
  }
}

/**
 * This should be done in jest setup file correctly,
 * unlock performance.now() mocking feature for jest
 */
Object.defineProperty(performance, "now", {
  value: jest.fn(),
  configurable: true,
  writable: true,
});

describe("TTL Cache implementation", () => {
  it.each([1, 9])(
    "should hold a configurable number of key-value pairs",
    (maxCacheSize) => {
      const cache = new TTLCacheImpl(maxCacheSize);
      expect(cache.maxCacheSize).toEqual(maxCacheSize);
    }
  );

  it.each([0, -1])(
    "should throw an error if the maxCacheSize is not a positive number",
    (maxCacheSize) => {
      expect(() => new TTLCacheImpl(maxCacheSize)).toThrowError(
        TTLCacheImpl.maxCacheSizeError
      );
      expect(() => new TTLCacheImpl(maxCacheSize)).toThrowError(
        TTLCacheImpl.maxCacheSizeError
      );
    }
  );

  it("should evict the oldest pair to make space for a new pair", () => {
    const cache = new TTLCacheImpl(1);
    cache.set("key1", "value1");
    expect(cache.get("key1")).toEqual("value1");
    expect(cache.size).toEqual(1);
    cache.set("key2", "value2");
    expect(cache.get("key1")).toEqual(null);
    expect(cache.get("key2")).toEqual("value2");
    expect(cache.size).toEqual(1);
    cache.set("key3", "value3");
    expect(cache.get("key2")).toEqual(null);
    expect(cache.get("key3")).toEqual("value3");
    expect(cache.size).toEqual(1);
  });

  it("should replace existing key-value pair on setting the same key", () => {
    const cache = new TTLCacheImpl(2);
    cache.set("key1", "value1");
    cache.set("key2", "value2-0");
    cache.set("key2", "value2-1");
    cache.set("key2", "value2-2");

    expect(cache.get("key1")).toEqual("value1");
    expect(cache.get("key2")).toEqual("value2-2");
  });

  it("should preserve correct order of key-value pairs on set when updating existing key", () => {
    const cache = new TTLCacheImpl(2);
    cache.set("key1", "value1-0");
    cache.set("key2", "value2");
    cache.set("key1", "value1-1");
    cache.set("key3", "value3");
    expect(cache.get("key2")).toEqual(null);
    expect(cache.get("key1")).toEqual("value1-1");
    expect(cache.get("key3")).toEqual("value3");
  });

  it("should keep value in the cache if the TTl is not exceeded", async () => {
    const performanceNowSpy = jest.spyOn(performance, "now");

    const cache = new TTLCacheImpl(1);
    performanceNowSpy.mockReturnValue(0);
    cache.set("key1", "value1");
    performanceNowSpy.mockReturnValue(GLOBAL_TTL_MS);

    expect(cache.get("key1")).toEqual("value1");
  });

  it("should evict value from the cache if the TTl is exceeded", async () => {
    const performanceNowSpy = jest.spyOn(performance, "now");

    const cache = new TTLCacheImpl(1);
    performanceNowSpy.mockReturnValue(0);
    cache.set("key1", "value1");
    expect(cache.get("key1")).toEqual("value1");
    performanceNowSpy.mockReturnValue(GLOBAL_TTL_MS + 1);

    expect(cache.get("key1")).toEqual(null);
  });
});
