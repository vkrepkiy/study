export function isElementsInArrDoubles(input: number[]): boolean {
  if (input.length < 2) {
    return false;
  }

  for (let i = 0; i < input.length; i++) {
    for (let x = i; x < input.length; x++) {
      if (input[i] === input[x] / 2 || input[i] === input[x] * 2) {
        return true;
      }
    }
  }
  return false;
}
