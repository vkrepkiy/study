function firstPositiveInt(array: number[]): number {
  let set = new Set(array);
  let i = 1;

  while (true) {
    if (!set.has(i)) {
      return i;
    }
    i++;
  }
}

it("should find", () => {
  expect(firstPositiveInt([1, 3, 6, 4, 1, 2])).toBe(5);
  expect(firstPositiveInt([-1, 3, 6, 4, 2, 2])).toBe(1);
});
