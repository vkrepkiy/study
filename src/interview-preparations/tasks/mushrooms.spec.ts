describe(`You are given a non-empty, zero-indexed array A of n (1 <= n <= 100 000) integers
a0, a1, . . . , an−1 (0 <= ai <= 1 000). This array represents number of mushrooms growing on the
consecutive spots along a road.

You are also given integers k and m (0 <= k, m < n).

A mushroom picker is at spot number k on the road and should perform m moves. In
one move she moves to an adjacent spot. She collects all the mushrooms growing on spots
she visits. The goal is to calculate the maximum number of mushrooms that the mushroom
picker can collect in m moves`, () => {
  it("should work", () => {});
});

function getMax(arr: number[], position: number, stepLimit: number) {
  const sumPrefixLeft = arr
    .slice(0, position)
    .reverse()
    .map((value, i, arr) => {
      return (arr[i - 1] || 0) + value;
    });

  const sumPrefixRight = arr.slice(position).map((value, i, arr) => {
    return (arr[i - 1] || 0) + value;
  });
}
