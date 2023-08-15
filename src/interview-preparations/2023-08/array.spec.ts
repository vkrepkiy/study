describe("My knowledge in Array algorithms", () => {
  describe("Merge Sort", () => {
    it.each([
      [
        [5, 4, 3, 2, 1],
        [1, 2, 3, 4, 5],
      ],
      [[5], [5]],
      [[], []],
      [
        [5, 100, -200, 0],
        [-200, 0, 5, 100],
      ],
    ])("should successfully sort an array", (array, sortedArray) => {
      expect(mergeSort(array)).toEqual(sortedArray);
    });
  });

  describe("Binary search", () => {
    it.each([
      [[1, 2, 3], 2, 1],
      [[1], 2, -1],
      [[], 0, -1],
      [[100, -700, 1, 2, 3, 4, 5], 4, 5],
    ])("find index", (array, value, index) => {
      expect(findIndex(array, value)).toBe(index);
    });
  });
});

/**
 *
 * @param _shift should be encapsulated into a separate function, keep out of public interface
 */
function findIndex<T = unknown>(array: T[], value: T, _shift = 0): number {
  const NOT_FOUND = -1;

  if (array.length < 2) {
    return array[0] === value ? _shift : NOT_FOUND;
  }

  const midpoint = Math.round(array.length / 2);

  if (array[midpoint] === value) {
    return _shift + midpoint;
  }

  return array[midpoint] < value
    ? findIndex(array.slice(midpoint), value, _shift + midpoint)
    : findIndex(array.slice(0, midpoint), value, _shift);
}

// [2, 1]
// [2]
// [3,2,1]
function mergeSort(array: number[]): number[] {
  // trick is: we are always working with the sorted arrays

  if (array.length < 2) {
    return array; // if array is empty or with a single value - return it back (sorted)
  }

  // 1
  // 1
  // 2
  const midpoint = Math.round(array.length / 2); // get midpoint
  // [2]
  // [2]
  // [3, 2]
  const arrayA = mergeSort(array.slice(0, midpoint)); // get sorted array A
  // [1]
  // []
  // [1]
  const arrayB = mergeSort(array.slice(midpoint)); // get sorted array B; do not add 2nd argument, it'd just slice to the end

  // we need to create a new SORTED array
  // get length first
  const resultLength = arrayA.length + arrayB.length;
  const resultArr = new Array(resultLength);

  // prepare indexes to iterate
  let ai = 0;
  let bi = 0;

  // iterate over result array
  for (let i = 0; i < resultLength; i++) {
    if (arrayA[ai] === undefined) {
      // if no A value, then B is fine
      resultArr[i] = arrayB[bi++];
    } else if (arrayB[bi] === undefined) {
      // if no B, then A value is fine
      resultArr[i] = arrayA[ai++];
    } else {
      resultArr[i] = arrayA[ai] < arrayB[bi] ? arrayA[ai++] : arrayB[bi++]; // or put the smallest one
    }
  }

  return resultArr;
}
