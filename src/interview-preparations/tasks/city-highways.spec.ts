/**
 *
 * @param arr
 * sorted ascending, unique values (arr[i] < arr[i+1])
 * 2 <= arr.length <= 100 000
 * 0 <= arr[i] <= 100 000
 *
 *
 * @returns minimum total travel time
 * result should be divided by 10^9 + 7.
 */
function lessDistance(arr: number[]): number {
  // catch direct link case
  if (arr.length === 2) {
    return 0;
  }

  // get target (last city)
  const target = arr[arr.length - 1];

  let minimumTravelTime = Infinity;
  // iterate over link possibilities
  for (let i = 0; i < arr.length - 1; i++) {
    const linkPosition = arr[i];
    let totalDistance = getTotalDistance(arr, linkPosition, target);

    if (totalDistance < minimumTravelTime) {
      minimumTravelTime = totalDistance;
    }
  }

  return minimumTravelTime % (10 ** 9 + 7);
}

function getTotalDistance(arr: number[], linkPosition: number, target: number) {
  let totalDistance = 0;
  // iterate over cities
  for (let x = 0; x < arr.length - 1; x++) {
    const currentCityPosition = arr[x];
    // catch zero costs
    if (currentCityPosition === linkPosition) {
      continue;
    }

    // catch cities before link
    if (currentCityPosition < linkPosition) {
      totalDistance += linkPosition - currentCityPosition;
      continue;
    }

    totalDistance += target - currentCityPosition;
  }

  return totalDistance;
}

it.each([
  [[5, 15], 0],
  [[1, 5, 9, 12], 7],
  [[2, 6, 7, 8, 12], 9],
])("should work", (input, expected) => {
  expect(lessDistance(input)).toBe(expected);
});
