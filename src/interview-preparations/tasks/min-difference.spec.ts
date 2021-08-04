/**
 *
 * @param arr
 * non-empty array of integers;
 * length - [2..100000];
 * arr[i] - [−1000..1000]
 *
 * @returns the smallest possible difference between 2 array parts
 */
function splitAndFindMin(arr: number[]): number {
  let minDifference = Infinity;
  let sumPrefixLeftToRight: number[] = [];
  let sumPrefixRightToLeft: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    // count sum from left
    sumPrefixLeftToRight[i] = arr[i] + (sumPrefixLeftToRight[i - 1] || 0);
    // count sum from right
    sumPrefixRightToLeft[i] =
      arr[arr.length - 1 - i] + (sumPrefixRightToLeft[i - 1] || 0);
  }

  for (let i = 0; i < arr.length; i++) {
    let leftSum = sumPrefixLeftToRight[i];
    let rightSum = sumPrefixRightToLeft[arr.length - 2 - i];
    let mod = Math.abs(leftSum - rightSum);

    if (mod < minDifference) {
      minDifference = mod;
    }
  }

  return minDifference;
}

it.each([
  [[1, 2], 1],
  [[30, 20, 10], 0],
])("should work", (input, expected) => {
  expect(splitAndFindMin(input)).toBe(expected);
});
