function findMedianSortedArrays(numsA: number[], numsB: number[]): number {
  /**
   * Median of
   * [1,2,3] is 2
   * [1] is 1
   * [] should throw
   */
  const resultArrLength = numsA.length + numsB.length;

  if (resultArrLength < 1) {
    throw new Error("Constraints not met");
  }

  const midpointIndex = resultArrLength / 2;

  /**
   * If isInteger === true we need only 1 number,
   * if isInteger === false we need to calculate 2 numbers / 2
   */
  const countWithPrevious = Number.isInteger(midpointIndex);
  // [] should throw
  // [1] => mp i is 0.5 (need to Math.floor, !integer === get single value)
  // [1,2] => mp i is 1 (no need to Math.floor, integer === get with previous value)
  // [1,2,3] mpI is 1 (2), [1] => mpI is 0 (1), [1,2,3,4,5] => mpI is 2 (3)
  // [1,2] => mpI is 0.5 (should get floor I + nextI) mpI 0 + 1 => values: 1, 2
  const stopOn = Math.floor(midpointIndex);

  let resultArr: number[] = []; // we may not need it but I'm short on time
  let ai = 0;
  let bi = 0;

  for (let i = 0; i < resultArrLength; i++) {
    // fill the result array (we may not need it and optimise it later)
    if (numsA[ai] === undefined) {
      resultArr[i] = numsB[bi++]; // ai out of range
    } else if (numsB[bi] === undefined) {
      resultArr[i] = numsA[ai++]; // bi out of range
    } else {
      resultArr[i] = numsA[ai] > numsB[bi] ? numsB[bi++] : numsA[ai++]; // all cursors in range
    }

    // catch midpoint
    if (stopOn === i) {
      if (countWithPrevious) {
        return (resultArr[i] + resultArr[i - 1]) / 2;
      } else {
        return resultArr[i];
      }
    }
  }

  throw new Error("something went wrong, median not found?");
}

describe("Median of sorted arrays", () => {
  it.each(<[[number[], number[]], number][]>[
    [[[], [1]], 1],
    [[[1], [2]], 1.5],
    [[[1], [2, 3]], 2],
    [[[1, 2, 3, 4], []], 2.5],
  ])("should work", (input, expected) => {
    expect(findMedianSortedArrays(...input)).toBe(expected);
  });
});
