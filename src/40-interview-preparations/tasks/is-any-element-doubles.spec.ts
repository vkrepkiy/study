describe(`\
Given an array of positive integers, write a function that \
returns true if any element in that array is the double of \
any other element.
`, () => {
  const inout: [number[], boolean][] = [
    [[1, 5, 6, -100, 4, -5], false],
    [[1, 5, 6, -100, 9, 2], true],
    [[0], false],
    [[0, 0], true],
    [[-20, -10], true],
  ];

  it.each(inout)("check", (input, output) => {
    expect(exec(input)).toBe(output);
  });

  function exec(input: number[]): boolean {
    if (input.length < 2) {
      return false;
    }

    for (let i = 0; i < input.length; i++) {
      for (let x = i; x < input.length; x++) {
        if (input[i] === input[x] / 2 || input[i] === input[x] * 2) {
          return true;
        }
      }
    }
    return false;
  }
});
