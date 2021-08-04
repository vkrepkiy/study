describe("binary-gap", () => {
  it.each([[32, 0]])("should work", (n, expected) => {
    expect(findBinaryGap(n)).toBe(expected);
  });
});

function findBinaryGap(n: number) {
  const str = n.toString(2);
  let gapStart = -1;
  let maxGap = 0;

  for (let i = 0; i < str.length; i++) {
    // catch the gap start
    if (str[i] === "0" && str[i - 1] === "1") {
      gapStart = i;
      continue;
    }

    // catch the gap end
    if (str[i] === "1" && gapStart > -1) {
      maxGap = Math.max(maxGap, i - gapStart);
      gapStart = -1;
    }
  }

  return maxGap;
}
