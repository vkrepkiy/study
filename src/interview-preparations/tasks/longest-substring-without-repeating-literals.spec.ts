import { lengthOfLongestSubstring } from "./longest-substring-without-repeating-literals";

describe(`Given a string s, find the length of the longest substring without repeating characters.`, () => {
  it.each([
    ["abcabcbb", 3],
    ["dvdf", 3],
    ["asjrgapa", 6],
    ["pwwkew", 3],
  ])("should work", (input, expected) => {
    expect(lengthOfLongestSubstring(input)).toBe(expected);
  });
});
