import { selectionSort, bubbleSort, mergeSort } from "./sorting-algorythms";

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
