/**
 * We should find "golden customers" which are appeared to be in all datasets
 */

it.each(<[string, number[]][]>[
  ["[[1,6,5],[2,1,4,5],[1,6,5,4],[1,3,4,5]]", [1, 5]],
  ["[]", []],
  ["[[1,5,6,7,8],[8,5,3,6,7,3,32,6,3,1],[99,77,66,55,44,33,5,1]]", [1, 5]],
  ["[[6]]", [6]],
  ["[[5,6],[6,5]]", [5, 6]],
])("should work", (input, expected) => {
  expect(exam1(input)).toEqual(expected);
});

/**
 * expected performance is O(n (log n))
 *
 * @param encodedArr
 * is always a valid string representing array of arrays
 *
 * 0 <= decodedArr.length <= 100
 *
 * decodedArr[i] – a Category (with customer ids)
 * 1 <= decodedArr[i] <= 1 000 000
 *
 * 0 <= decodedArr[i].length <= 1 000 customer ids
 *
 *
 * NOTE: customer may buy multiple times! (remove category doubles)
 *
 * @returns sorted array of customers who bought in each category
 *
 */

/**
 *
 *function solution(encodedArr: string): number[] {
 *  let result: number[] = [];
 *
 *  // If I understand conditions correctly, it has to be valid
 *  let categories: [number[]] = JSON.parse(encodedArr);
 *  // [] -> 0 cats, [[],[]] -> 2 cats
 *  const categoriesTotal = categories.length;
 *  const customerCounter = new Map<number, number>();
 *
 *  // iterate each category
 *  for (let i = 0; i < categories.length; i++) {
 *    // filter client ids
 *    const uniqueClientsAtCategory = new Set(categories[i]);
 *
 *    uniqueClientsAtCategory.forEach((clientId) => {
 *      // fill client counter
 *      customerCounter.set(clientId, (customerCounter.get(clientId) || 0) + 1);
 *
 *      // on last iteration we can already pick our golden customers
 *      if (
 *        i === categoriesTotal - 1 &&
 *        customerCounter.get(clientId) === categoriesTotal
 *      ) {
 *        result.push(clientId);
 *      }
 *    });
 *  }
 *
 *  // this adds additional complexity...
 *  return result.sort((a, b) => a - b);
 *}
 *
 */

function exam1(encodedArr: string): number[] {
  let result: number[] = [];

  // If I understand conditions correctly, it has to be valid
  let categories: [number[]] = JSON.parse(encodedArr);
  // [] -> 0 cats, [[],[]] -> 2 cats
  const categoriesTotal = categories.length;
  const customerCounter = new Map<number, number>();

  // iterate each category
  for (let i = 0; i < categories.length; i++) {
    // filter client ids
    const uniqueClientsAtCategory = new Set(categories[i]);

    uniqueClientsAtCategory.forEach((clientId) => {
      // fill client counter
      customerCounter.set(clientId, (customerCounter.get(clientId) || 0) + 1);

      // on last iteration we can already pick our golden customers
      if (
        i === categoriesTotal - 1 &&
        customerCounter.get(clientId) === categoriesTotal
      ) {
        result.push(clientId);
      }
    });
  }

  // this adds additional complexity...
  return result.sort((a, b) => a - b);
}
