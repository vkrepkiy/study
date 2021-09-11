describe(`
Given an integer n, return true if n has exactly three positive divisors. Otherwise, return false.

An integer m is a divisor of n if there exists an integer k such that n = k * m.
`, () => {
  it.each([
    [2, false],
    [4, true],
  ])("should work", (input, expected) => {
    expect(isThreeDividers(input)).toBe(expected);
  });
});

/**
 *
 * @param n
 * 1 <= n <= 104
 */
function isThreeDividers(n: number) {
  let dividers = 0;
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      dividers++;
    }

    if (dividers > 3) {
      return false;
    }
  }

  return dividers === 3;
}
