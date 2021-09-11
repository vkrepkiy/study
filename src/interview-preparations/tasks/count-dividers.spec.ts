/**
 *
 * @param A 0..2,000,000,000
 * @param B 0..2,000,000,000
 * @param K 1..2,000,000,000
 *
 * A ≤ B
 *
 * @returns the number of integers within the range [A..B] that are divisible by K
 */
function countDiv(a: number, b: number, k: number) {
  let aDividers = 0;
  let bDividers = Math.floor(b / k);

  if (a > 0) {
    aDividers = Math.floor((a - 1) / k);
  } else {
    bDividers++;
  }

  return bDividers - aDividers;
}

it.each(<[[number, number, number], number][]>[
  [[6, 11, 2], 3],
  [[0, 1, 11], 1],
  [[0, 10, 2], 6],
  [[0, 10, 1], 11],
  [[10, 10, 5], 1],
])("should work", (input, expected) => {
  expect(countDiv(...input)).toBe(expected);
});
