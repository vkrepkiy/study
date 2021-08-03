import { binarySearch, mergeSort } from "./array";

describe("Array playground", () => {
  const inout: [
    { input: number[]; searchValue: number; searchResult: boolean }
  ][] = [
    [
      {
        input: new Array(),
        searchValue: 0,
        searchResult: false,
      },
    ],
    [
      {
        input: new Array(100000).fill(null).map((_, i) => i),
        searchValue: 1000000,
        searchResult: false,
      },
    ],
    [
      {
        input: new Array(10000).fill(null).map((_, i) => i * -1),
        searchValue: -1000,
        searchResult: true,
      },
    ],
    [
      {
        input: [1, 2, 3, 4, 5, 6],
        searchValue: 0,
        searchResult: false,
      },
    ],
    [
      {
        input: [1, 2, 3, 4, 5, 6],
        searchValue: 3,
        searchResult: true,
      },
    ],
    [
      {
        input: [1, 2, 3, 4, 5, 6],
        searchValue: 4,
        searchResult: true,
      },
    ],
  ];

  it.each(inout)("merge sort", (data) => {
    expect(mergeSort(data.input)).toEqual(data.input.sort((a, b) => a - b));
  });

  it.each(inout)("binary search", (data) => {
    expect(binarySearch(data.input, data.searchValue)).toBe(data.searchResult);
  });
});
