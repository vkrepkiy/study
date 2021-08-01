describe(`Find the first positive integer that is not included in the array`, () => {
  test.each([
    [[-10, 5, -9, 4, -8, 3, 0, 2, 0], 1],
    [[-10, 5, -9, 4, -8, 1, 1, 1, 2, 0], 3],
    [[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 11],
  ])("should be correct", (input, result) => {
    expect(findFirstFreePositiveInt(input)).toBe(result);
  });
});

function findFirstFreePositiveInt(arr: number[]): number {
  arr = arr
    .sort((a, b) => a - b)
    .filter((val, i, array) => val > 0 && val !== array[i - 1]);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== i + 1) {
      return i + 1;
    }
  }

  return arr.length + 1;
}
