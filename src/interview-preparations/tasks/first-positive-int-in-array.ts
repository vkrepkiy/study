export function findFirstFreePositiveInt(arr: number[]): number {
  arr = arr
    .sort((a, b) => a - b)
    .filter((val, i, array) => val > 0 && val !== array[i - 1]);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== i + 1) {
      return i + 1;
    }
  }

  return arr.length + 1;
}
