/**
 * Find substr in str without repeating chars.
 *
 * Extreme conditions:
 * - 0 length
 * - all chars are the same
 * - (NO) is chars UTF? then there could be symbols like 🥸 and other strange things
 * - (YES) string consists of English letters, digits, symbols and spaces
 * - minimal substring without repetition could be any single string (1)
 *
 * We should return: length of substring.
 */

export function lengthOfLongestSubstring(str: string): number {
  if (str.length < 2) {
    return str.length;
  }

  let maxLen = 0;

  for (let i = 0; i < str.length; i++) {
    let currentSet = new Set<string>();
    for (let x = i; x < str.length; x++) {
      const unique = !currentSet.has(str[x]);
      const isLastItem = x === str.length - 1;

      // Add unique
      if (unique) {
        currentSet.add(str[x]);
        // continue to count if not last item
        if (!isLastItem) {
          continue;
        }
      }

      // Save the maxLen
      if (currentSet.size > maxLen) {
        maxLen = currentSet.size;
      }

      break;
    }
  }

  return maxLen;
}
