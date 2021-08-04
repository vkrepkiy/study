function frogJumpCounter(start: number, finish: number, step: number): number {
  return Math.ceil((finish - start) / step);
}

it.each([[10, 85, 30, 3]])("should work", (a, b, c, expected) => {
  expect(frogJumpCounter(a, b, c)).toBe(expected);
});
