/**
 * If I remember correctly:
 *
 * We need to find the best place to build a shop
 * 1 - represents building, 0 - just some space
 * we should find the best places (with most buildings around in K radius) to build a shop
 *
 * return amount of such best places to build a shop
 */

it.each(<[number, number[][], number][]>[
  [
    2,
    [
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [1, 0, 0, 1],
    ],
    2,
  ],
  [
    1,
    [
      [0, 1],
      [0, 0],
    ],
    2,
  ],
  [
    4,
    [
      [0, 0, 0, 1],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    8,
  ],
])("should work", (k, matrix, expected) => {
  expect(solution(k, matrix)).toEqual(expected);
});

/**
 *
 * row index = y
 * col index = x
 *
 * @returns number of acceptable points
 */
function solution(k: number, matrix: number[][]): number {
  let amountOfSuitablePoints = 0;
  let totalHouses = 0;
  let candidates = new Map<string, number>();

  // go through each cell, by axis
  // iterate rows
  for (let y = 0; y < matrix.length; y++) {
    // iterate columns in the row
    for (let x = 0; x < matrix[y].length; x++) {
      // get all available points for the house
      if (matrix[y][x] === 1) {
        // set houses found
        totalHouses += 1;

        // get candidates for this cell
        peekCandidates(y, x, k, matrix).forEach((coords) =>
          // apply this candidates to the global counter
          candidates.set(
            coords.toString(),
            (candidates.get(coords.toString()) || 0) + 1
          )
        );
      }
    }
  }

  candidates.forEach((candidate) => {
    if (candidate === totalHouses) {
      amountOfSuitablePoints++;
    }
  });

  return amountOfSuitablePoints;
}

/**
 * Get available cells in K range
 * @param k represents range
 *
 * @returns coordinates of the surrounding buildings in K range (exclude building itself)
 *
 */
function peekCandidates(
  y: number,
  x: number,
  k: number,
  matrix: number[][]
): Set<[number, number]> {
  // [[1,2], [5,5], ...]
  let result = new Set<[number, number]>();

  let maxY = matrix.length - 1; // get global row limit for matrix
  let maxX = matrix[0]?.length - 1 || 0; // get global col limit for matrix

  // get min and max for range K to iterate rows
  let yMin = Math.max(0, y - k);
  let yMax = Math.min(maxY, y + k);

  // get mn and max for range K to iterate cells
  let xMin = Math.max(0, x - k);
  let xMax = Math.min(maxX, x + k);

  for (let y2 = yMin; y2 <= yMax; y2++) {
    for (let x2 = xMin; x2 <= xMax; x2++) {
      // filter house itself
      if (y === y2 && x === x2) {
      } else {
        if (pathLength([y, x], [y2, x2]) <= k) {
          result.add([y2, x2]);
        }
      }
    }
  }

  return result;
}

function pathLength(a: [number, number], b: [number, number]): number {
  // there is no negative number, so just get abs
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}
