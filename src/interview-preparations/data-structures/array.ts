/**
 * Self complexity (array is sorted): logarithmic O(log(n))
 */
export function binarySearch(arr: number[], value: number): boolean {
  return binarySearchSorted(mergeSort(arr), value);
}

export function binarySearchSorted(arr: number[], value: number): boolean {
  if (arr.length < 2) {
    return arr[0] === value;
  }

  const midpoint = Math.round(arr.length / 2);

  return binarySearchSorted(
    value < arr[midpoint] ? arr.slice(0, midpoint) : arr.slice(midpoint),
    value
  );
}

/**
 * Complexity: linearithmic O(n log(n))
 */
export function mergeSort<T>(arr: T[]): T[] {
  if (arr.length < 2) {
    return arr;
  }

  const midpoint = Math.round(arr.length / 2);
  const a = mergeSort(arr.slice(0, midpoint));
  const b = mergeSort(arr.slice(midpoint));

  const result: T[] = [];
  const resultLength = a.length + b.length;
  let ai = 0;
  let bi = 0;

  for (let i = 0; i < resultLength; i++) {
    if (a[ai] === undefined) {
      result[i] = b[bi++];
      continue;
    }
    if (b[bi] === undefined) {
      result[i] = a[ai++];
      continue;
    }

    result[i] = a[ai] > b[bi] ? b[bi++] : a[ai++];
  }

  return result;
}
