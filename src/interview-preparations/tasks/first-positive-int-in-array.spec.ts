import { findFirstFreePositiveInt } from "./first-positive-int-in-array";

describe(`Find the first positive integer that is not included in the array`, () => {
  test.each([
    [[-10, 5, -9, 4, -8, 3, 0, 2, 0], 1],
    [[-10, 5, -9, 4, -8, 1, 1, 1, 2, 0], 3],
    [[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 11],
  ])("should be correct", (input, result) => {
    expect(findFirstFreePositiveInt(input)).toBe(result);
  });
});
