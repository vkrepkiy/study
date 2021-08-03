import { MyStack } from "./stack";

describe("Stack", () => {
  it("should push and pop", () => {
    const stack = new MyStack();

    expect(stack.size).toBe(0);

    stack.push(1);
    expect(stack.size).toBe(1);

    stack.push(2);
    stack.push(3);
    expect(stack.size).toBe(3);

    expect(stack.pop()?.value).toBe(3);
    expect(stack.size).toBe(2);
    expect(stack.pop()?.value).toBe(2);
    expect(stack.size).toBe(1);
    expect(stack.pop()?.value).toBe(1);
    expect(stack.size).toBe(0);
  });
});
