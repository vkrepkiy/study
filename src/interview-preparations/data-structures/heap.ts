/**
 * Heap should have invariant (child value is equal or bigger / less than parent – Min heap/Max heap)
 * Binary heap may be represented as an array with the following index logic:
 *
 *        0
 *      /   \
 *     1     2
 *    /\     /\
 *   3  4   5  6
 */

abstract class MinQueueMapStore<T> {
  private map = new Map<T, number[]>();

  protected indexOf(value: T): number | -1 {
    const indices = this.map.get(value);

    return indices ? indices[0] : -1;
  }

  protected mapSet(value: T, index: number) {
    const indexArr = this.map.get(value) || [];
    this.map.set(value, indexArr.concat(index));
  }

  protected mapPop(value: T): number {
    const indexArr = this.map.get(value);

    if (!indexArr || indexArr.length < 1) {
      throw new Error("not found");
    }

    // we have checked that we have at least one item to pop
    const poppedIndex = indexArr.pop() as number;

    if (indexArr.length < 2) {
      this.map.delete(value);
    } else {
      this.map.set(value, indexArr);
    }

    return poppedIndex;
  }
}

abstract class MinQueueStore<T> extends MinQueueMapStore<T> {
  public get size(): number {
    return this.array.length;
  }

  private array: T[] = [];

  public toArray() {
    return [...this.array];
  }

  protected swap(ai: number, bi: number): [number, number] {
    if (this.outOfRange(ai, bi)) {
      throw new Error("out of range");
    }

    const valueA = this.array[ai];
    const valueB = this.array[bi];
    const indexA = this.mapPop(valueA);
    const indexB = this.mapPop(valueB);

    this.array[indexA] = valueB;
    this.mapSet(valueB, indexA);
    this.array[indexB] = valueA;
    this.mapSet(valueA, indexB);

    return [indexB, indexA];
  }

  protected value(i: number): T {
    if (this.outOfRange(i)) {
      throw new Error("out of range");
    }

    return this.array[i] as T;
  }

  protected arrayPush(value: T): number {
    const i = this.array.push(value) - 1;
    this.mapSet(value, i);
    return i;
  }

  protected arrayPop(): T {
    if (this.size < 1) {
      throw new Error("nothing to pop");
    }

    // we have verified that we can pop at least one one item
    const value = this.array.pop() as T;
    this.mapPop(value);
    return value;
  }

  protected outOfRange(...indeces: number[]) {
    return indeces.some((i) => i < 0 || i > this.size - 1);
  }
}

export class MinPriorityQueue<T> extends MinQueueStore<T> {
  public get valid() {
    if (this.size < 1) {
      return true;
    }

    return this.isValid(0);
  }

  public add(value: T) {
    this.bubble(this.arrayPush(value));
  }

  public remove(value: T) {
    this.removeAt(this.indexOf(value));
  }

  public poll() {
    this.removeAt(0);
  }

  protected isValid(i: number): boolean {
    let left = this.getLeft(i);
    let right = this.getRigth(i);

    if (!this.outOfRange(left) && !this.isValid(left)) {
      return false;
    }
    if (!this.outOfRange(right) && !this.isValid(right)) {
      return false;
    }

    return this.compare(i, this.parentIndex(i)) > -1;
  }

  protected removeAt(i: number) {
    if (this.outOfRange(i)) {
      throw new Error("out of range");
    }

    this.swap(i, this.size - 1);
    this.arrayPop();
    this.dive(i);
  }

  protected bubble(itemToBubble: number) {
    let parentIndex = this.parentIndex(itemToBubble);

    if (parentIndex < 0) {
      return;
    }

    if (this.compare(itemToBubble, parentIndex) < 0) {
      [itemToBubble] = this.swap(itemToBubble, parentIndex);
      this.bubble(itemToBubble);
    }
  }

  protected dive(itemToDive: number) {
    let left = this.getLeft(itemToDive);
    let right = this.getRigth(itemToDive);
    let smallest = this.compare(left, right) < 1 ? left : right;

    if (this.compare(itemToDive, smallest) > 0) {
      [itemToDive] = this.swap(itemToDive, smallest);
      this.dive(itemToDive);
    }
  }

  private compare(a: number, b: number): -1 | 0 | 1 {
    const aOutOfRange = this.outOfRange(a);
    const bOutOfRange = this.outOfRange(b);

    if (aOutOfRange && bOutOfRange) {
      return 0;
    } else if (aOutOfRange || bOutOfRange) {
      return aOutOfRange ? -1 : 1;
    }

    return this.compareValue(this.value(a), this.value(b));
  }

  /**
   * 1 for A > B | 0 for A === B | -1 for A < B
   */
  private compareValue(a: T, b: T): -1 | 0 | 1 {
    if (a === b) {
      return 0;
    }

    return a > b ? 1 : -1;
  }

  private parentIndex(i: number): number {
    return this.isRightNode(i) ? i / 2 - 1 : (i - 1) / 2;
  }

  private getLeft(i: number): number {
    return 2 * i + 1;
  }

  private getRigth(i: number): number {
    return 2 * i + 2;
  }

  private isRightNode(i: number): boolean {
    return !(i % 2);
  }
}
