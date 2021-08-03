import { Queue } from "./queue";

describe("Queue", () => {
  it("should queue and dequeue and return correct size of queue", () => {
    const queue = new Queue();

    expect(queue.size).toBe(0);
    queue.queue(1);
    expect(queue.size).toBe(1);
    queue.queue(2);
    queue.queue(3);
    expect(queue.size).toBe(3);
    expect(queue.dequeue()?.value).toBe(1);
    expect(queue.size).toBe(2);
    expect(queue.dequeue()?.value).toBe(2);
    expect(queue.dequeue()?.value).toBe(3);
    expect(queue.size).toBe(0);
  });
});
