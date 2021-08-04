function longestPalindrome(s: string): string {
  let longest = s[0];

  // start looking for each substring
  for (let i = 0; i < s.length; i++) {
    // next palyndrome should be at least bigger
    for (let x = i + longest.length + 1; x < s.length + 1; x++) {
      // check if a palyndrome
      if (isPalindrome(s.slice(i, x))) {
        // store if all conditions met
        longest = s.slice(i, x);
      }
    }
  }

  return longest;
}

function isPalindrome(s: string): boolean {
  let ai = 0;
  let bi = s.length - 1;

  while (bi - ai > -1) {
    if (s[ai++] !== s[bi--]) {
      return false;
    }
  }

  return true;
}

describe("", () => {
  it.each([
    ["babad", "bab"],
    ["cbbd", "bb"],
    ["a", "a"],
    ["ac", "a"],
    ["bb", "bb"],
    ["bbbbbbb", "bbbbbbb"],
  ])("", (input, expected) => {
    expect(longestPalindrome(input)).toBe(expected);
  });
});
