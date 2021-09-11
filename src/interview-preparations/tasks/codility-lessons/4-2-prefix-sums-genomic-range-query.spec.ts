/**
 *
 * @param dna string, length in [1..100,000];
 * consists of A, C, G, T
 *
 * @param start query start
 * length in [1..50,000]
 * <= 0 start[i] < dna.length
 *
 * start.length === stop.length
 *
 * @param stop query stop
 * length in [1..50,000]
 * <= 0 start[i] < dna.length
 *
 *
 * @returns
 * should return arr with answers (answers.length === start.length) for all queries
 */

const dnaKeyToNumValue: Record<string, number> = {
  A: 1,
  C: 2,
  G: 3,
  T: 4,
};

function genomicRangeQuery(
  dna: string,
  from: number[],
  to: number[]
): number[] {
  // create counters (sums)
  // init with empty
  const dnaKeySums: Record<"A" | "C" | "G" | "T", number[]> = {
    A: [0],
    C: [0],
    G: [0],
    T: [0],
  };

  for (let i = 0; i < dna.length; i++) {
    dnaKeySums.A[i] = (dnaKeySums.A[i] || 0) + (dnaKeySums.A[i - 1] || 0);
    dnaKeySums.C[i] = (dnaKeySums.C[i] || 0) + (dnaKeySums.C[i - 1] || 0);
    dnaKeySums.G[i] = (dnaKeySums.G[i] || 0) + (dnaKeySums.G[i - 1] || 0);
    dnaKeySums.T[i] = (dnaKeySums.T[i] || 0) + (dnaKeySums.T[i - 1] || 0);

    // increase counter
    dnaKeySums[dna[i] as "A" | "C" | "G" | "T"][i]++;
  }

  let result = [];
  // Include the smallest one found
  for (let i = 0; i < from.length; i++) {
    let sliceFrom = from[i] - 1;
    let sliceTo = to[i];

    if (sliceFrom === sliceTo) {
      result.push(dnaKeyToNumValue[dna[sliceTo]]);
      continue;
    }

    if (dnaKeySums.A[sliceTo] - (dnaKeySums.A[sliceFrom] || 0) > 0) {
      result.push(dnaKeyToNumValue["A"]);
      continue;
    }

    if (dnaKeySums.C[sliceTo] - (dnaKeySums.C[sliceFrom] || 0) > 0) {
      result.push(dnaKeyToNumValue["C"]);
      continue;
    }

    if (dnaKeySums.G[sliceTo] - (dnaKeySums.G[sliceFrom] || 0) > 0) {
      result.push(dnaKeyToNumValue["G"]);
      continue;
    }

    // If nothing else met, then it's "T"
    result.push(dnaKeyToNumValue["T"]);
  }

  return result;
}

it.each(<[[string, number[], number[]], number[]][]>[
  [
    ["CAGCCTA", [2, 5, 0], [4, 5, 6]],
    [2, 4, 1],
  ],
  [["C", [0], [0]], [2]],
  [
    ["AC", [0, 0, 1], [0, 1, 1]],
    [1, 1, 2],
  ],
])("should work", (input, expected) => {
  expect(genomicRangeQuery(...input)).toEqual(expected);
});
