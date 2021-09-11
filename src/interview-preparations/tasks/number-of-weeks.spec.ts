/**
 *
 * @param milestones
 * 1 <= milestones.length <= 105
 * 1 <= milestones[i] <= 109
 *
 * @returns
 */
function numberOfWeeks(projects: number[]): number {
  if (projects.length < 2) {
    return projects[0] ? 1 : 0;
  }

  let sum = 0;
  let maxVal = 0;

  for (let i = 0; i < projects.length; i++) {
    if (projects[i] > maxVal) {
      maxVal = projects[i];
    }

    sum += projects[i];
  }

  let sumWithoutMax = sum - maxVal;

  if (maxVal > sumWithoutMax + 1) {
    return sum - (maxVal - sumWithoutMax - 1);
  }

  return sum;
}

it.each([
  [[1, 2, 3], 6],
  [[5, 2, 1], 7],
  [[5, 7, 5, 7, 9, 7], 40],
])("should work", (input, expected) => {
  expect(numberOfWeeks(input)).toBe(expected);
});
