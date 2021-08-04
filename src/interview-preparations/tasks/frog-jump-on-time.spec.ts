function frogJumps(target: number, arr: number[]): number {
  const leaves = new Set(new Array(target).fill(0).map((_, i) => i + 1));

  for (let i = 0; i < arr.length; i++) {
    if (leaves.has(arr[i])) {
      leaves.delete(arr[i]);
    }

    if (leaves.size === 0) {
      return i;
    }
  }

  return -1;
}

it("should work", () => {
  expect(frogJumps(10, [1])).toBe(-1);
  expect(frogJumps(5, [1, 3, 1, 4, 2, 3, 5])).toBe(6);
  expect(frogJumps(10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(10);
});
