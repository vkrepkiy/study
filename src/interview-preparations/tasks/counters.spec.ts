/**
 * @param arr
 * non-empty
 * 1 ≤ arr[i] ≤ counterSize
 *
 * @param counterSize
 * 1 <= counterSize <= 100000
 *
 * @return counter as array of integers
 *
 * TODO: find better solution with O(m+n)
 */
function countersSquaredComplexity(counterSize: number, arr: number[]) {
  let result = new Array(counterSize).fill(0);

  /**
   * counters: 1  2  3    (4) – set to max
   *         [ 0, 0, 0 ]
   */
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === counterSize + 1) {
      result = result.map(() => max);
      continue;
    }

    // real counter position is X - 1 (they enum from 1 by condition)
    result[arr[i] - 1] += 1;

    if (result[arr[i] - 1] > max) {
      max = result[arr[i] - 1];
    }
  }

  return result;
}

it("should count", () => {
  expect(countersSquaredComplexity(2, [1])).toEqual([1, 0]);
  expect(countersSquaredComplexity(5, [3, 4, 4, 6, 1, 4, 4])).toEqual([
    3, 2, 2, 4, 2,
  ]);
  const expectedA = new Array(100000).fill(0);
  expectedA[0] = 1;
  expect(countersSquaredComplexity(100000, [1])).toEqual(expectedA);
});
