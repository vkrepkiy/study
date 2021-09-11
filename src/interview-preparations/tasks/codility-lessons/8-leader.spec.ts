/**
 * Leader is the value that could be find in array more than array.length/2 times.
 */
function findLeader(arr: number[]): number | null {
  let virtualStackSize = 0;
  let value: number | null = null;

  for (let i = 0; i < arr.length; i++) {
    value = arr[i];
    if (virtualStackSize === 0) {
      virtualStackSize++;
    } else {
      virtualStackSize += arr[i - 1] === arr[i] ? 1 : -1;
    }
  }

  if (virtualStackSize < 1) {
    return null;
  }

  let candidateCounter = 0;
  for (let i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      candidateCounter++;
    }
  }

  return candidateCounter * 2 > arr.length ? value : null;
}

it.each([
  [[1, 2, 3, 4, 4, 4, 4], 4],
  [new Array(100000).fill(0).map((_, i) => i), null],
])("should work", (input, expected) => {
  expect(findLeader(input)).toBe(expected);
});
