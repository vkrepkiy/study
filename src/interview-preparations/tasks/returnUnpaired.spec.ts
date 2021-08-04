function returnUnpaired(array: number[]): number {
  const set = new Set<number>();
  for (let i = 0; i < array.length; i++) {
    if (set.has(array[i])) {
      set.delete(array[i]);
    } else {
      set.add(array[i]);
    }
  }

  // we have constraint that 1 unique value should exist
  return set.values().next().value;
}

it.each([
  [[1], 1],
  [[1, 2, 1], 2],
])("should work", (arr, expected) => {
  expect(returnUnpaired(arr)).toBe(expected);
});
