function findGap(arr: number[]) {
  const set = new Set<number>(arr);
  for (let i = 1; i <= arr.length + 1; i++) {
    if (!set.has(i)) {
      return i;
    }
  }

  return 0;
}

function findGap2(arr: number[]) {
  const len = arr.length + 1; // add one, because 1 is missing
  const expectedSum = (len * (len + 1)) / 2;

  return expectedSum - arr.reduce((result, n) => (result += n), 0);
}

it.each([
  [[], 1],
  [[2, 3, 1, 5], 4],
])("should find missing el", (input, expected) => {
  expect(findGap2(input)).toBe(expected);
  expect(findGap(input)).toBe(expected);
});
