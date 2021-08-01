/**
 * bubble sort
 */
const sortInOut = [
  [
    [5, 2, 0, 1, 3, 5, 3, -5, 1, 3],
    [5, 2, 0, 1, 3, 5, 3, -5, 1, 3].sort((a, b) => a - b),
  ],
  [
    [5, 2, 0, 1, 3, 5, 3, -5, Number.MAX_SAFE_INTEGER, 3],
    [5, 2, 0, 1, 3, 5, 3, -5, Number.MAX_SAFE_INTEGER, 3].sort((a, b) => a - b),
  ],
  [
    [5, 2, 0, Number.MIN_SAFE_INTEGER, 3, 5, 3, -5, Number.MAX_SAFE_INTEGER, 3],
    [
      5,
      2,
      0,
      Number.MIN_SAFE_INTEGER,
      3,
      5,
      3,
      -5,
      Number.MAX_SAFE_INTEGER,
      3,
    ].sort((a, b) => a - b),
  ],
];

describe("Sorting algorythms", () => {
  it.each(sortInOut)("bubble sort", (input, result) => {
    expect(bubbleSort(input)).toEqual(result);
  });

  it.each(sortInOut)("selection sort", (input, result) => {
    expect(selectionSort(input)).toEqual(result);
  });

  it.each(sortInOut)("merge sort", (input, result) => {
    expect(mergeSort(input)).toEqual(result);
  });
});

/**
 * Bubble sort. O(n(2)) in worst case. O(n) in best
 */
function bubbleSort(arr: number[]): number[] {
  let done = false;

  for (let x = 0; x < arr.length; x++) {
    done = true;
    for (let i = 0; i < arr.length - x; i++) {
      const a = arr[i];
      const b = arr[i + 1];

      /**
       * If not sorted, then set done to false and swap [i] with [i+1]
       */
      if (a > b) {
        arr[i] = b;
        arr[i + 1] = a;
        done = false;
      }
    }

    if (done) {
      return arr;
    }
  }

  return arr;
}

/**
 * Selection sort. Complexity O(n(2)), quadratic, in all cases; bad algorythm
 */
function selectionSort(arr: number[]): number[] {
  for (let x = 0; x < arr.length; x++) {
    let minIndex = x;

    for (let i = x + 1; i < arr.length; i++) {
      if (arr[minIndex] > arr[i]) {
        minIndex = i;
      }
    }

    arr.splice(x, 0, arr[minIndex]);
    arr.splice(minIndex + 1, 1);
  }

  return arr;
}

function mergeSort(arr: number[]): number[] {
  if (arr.length < 2) {
    return arr;
  }

  /**
   * Split on 2 arrays
   */
  const mid = Math.round(arr.length / 2);
  const a = mergeSort(arr.slice(0, mid));
  const b = mergeSort(arr.slice(mid));

  /**
   * Merge arrays
   */
  const result: number[] = new Array(a.length + b.length).fill(0);

  let ai = 0;
  let bi = 0;

  for (let i = 0; i < result.length; i++) {
    if (b[bi] === undefined) {
      result[i] = a[ai++];
      continue;
    }
    if (a[ai] === undefined) {
      result[i] = b[bi++];
      continue;
    }

    result[i] = a[ai] > b[bi] ? b[bi++] : a[ai++];
  }

  return result;
}
