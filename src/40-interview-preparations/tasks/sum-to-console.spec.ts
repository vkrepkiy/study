import { sumToConsole } from "./sum-to-console";

describe("Make sum fn so each call it return with console.log the number with the sum of all previous numbers", () => {
  const inout: [number[], number][] = [
    [[1, 2, 3, 4], 10],
    [[4, 0, 0], 4],
    [[-10, 0, 10], 0],
  ];

  it.each(inout)("should work", (input, result) => {
    let spy = jest.spyOn(console, "log");
    let fn = sumToConsole;

    for (let i = 0; i < input.length; i++) {
      fn = fn(input[i]);
    }

    expect(spy).lastCalledWith(result);
  });
});
