describe(`
If we list all the natural numbers below 10 that are multiples of 3 or 5,
we get 3, 5, 6, 9.
The sum of these multiples is 23

Find the sum of all the multiples of 3 or 5 below 1000
`, () => {
  it("should work", () => {
    expect(getSumOfAllMultiples(3, 5, 10)).toBe(23);
    expect(getSumOfAllMultiples(3, 5, 1000)).toBe(233168);
  });
});

function getSumOfAllMultiples(a: number, b: number, below: number): number {
  // key is multiple of a or b
  // value is counter (if 2 times -> add to sum)
  const candidates = new Set<number>();

  let curA = a;
  while (curA < below) {
    // set all for a
    if (!candidates.has(curA)) candidates.add(curA);
    curA += a;
  }

  let curB = b;
  while (curB < below) {
    // set all for b
    if (!candidates.has(curB)) candidates.add(curB);
    curB += b;
  }

  return Array.from(candidates).reduce((sum, x) => {
    return (sum += x);
  }, 0);
}
