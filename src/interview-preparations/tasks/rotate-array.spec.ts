/**
 * 0 >= array.length >= 100
 * -1000 <= array[i] <= 1000
 */
function rotateArray(array: number[], rotateTimes: number) {
  if (array.length < 2) {
    return array;
  }

  while (rotateTimes-- > 0) {
    array = [array.pop()!, ...array];
  }

  return array;
}

it.each([
  [[1, 2, 3], 3, [1, 2, 3]],
  [[1, 2, 3], 1, [3, 1, 2]],
  [[], 10, []],
  [[1, 2, 3], 0, [1, 2, 3]],
])("should work", (arr, r, expected) => {
  expect(rotateArray(arr, r)).toEqual(expected);
});
