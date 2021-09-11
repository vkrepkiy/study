function maxSlice(arr: number[]): number {
  let maxEnding = 0;
  let maxSlice = 0;

  for (let i = 0; i < arr.length; i++) {
    // while maxEnding > 0 we continue counting the slice
    // if maxEnding < 0 we reset it to zero
    maxEnding = Math.max(0, maxEnding + arr[i]);
    // store the biggest slice found
    maxSlice = Math.max(maxSlice, maxEnding);
  }

  return maxSlice;
}

it.each([[[1, 6, 6, -18, 6, 7, 6], 19]])("should work", (input, expected) => {
  expect(maxSlice(input)).toBe(expected);
});
