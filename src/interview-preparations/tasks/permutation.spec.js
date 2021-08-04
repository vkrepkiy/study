/**
 *
 * @param array
 * 1 <= array.length <= 100000
 * 1 <= array[i] <= 1000000000
 *
 * @returns
 * 1 or 0
 */
function isPermutation(array) {
    // we need to perform 2 checks:
    // - is there any doubles? check with set
    var set = new Set();
    // - is there any missing values? check by expected array sum
    var expectedSum = (array.length * (array.length + 1)) / 2;
    var realSum = 0;
    for (var i = 0; i < array.length; i++) {
        if (set.has(array[i])) {
            return 0;
        }
        set.add(array[i]);
        realSum += array[i];
    }
    return expectedSum === realSum ? 1 : 0;
}
it("should detect permutation", function () {
    expect(isPermutation([1, 2, 3])).toBe(1);
    expect(isPermutation([1, 3])).toBe(0);
    expect(isPermutation([2, 2, 2])).toBe(0);
});
