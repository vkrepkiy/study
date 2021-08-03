import { MinPriorityQueue } from "./heap";

describe("Heap", () => {
  it("should insert in correct order (input in order)", () => {
    const heap = new MinPriorityQueue();
    expect(heap.size).toBe(0);
    heap.add(0);
    expect(heap.size).toBe(1);
    heap.add(1);
    heap.add(2);
    heap.add(3);
    expect(heap.size).toBe(4);
    expect(heap.toArray()).toEqual([0, 1, 2, 3]);
  });

  it("should insert in correct order (input reversed)", () => {
    const heap = new MinPriorityQueue();
    expect(heap.size).toBe(0);
    heap.add(3);
    expect(heap.size).toBe(1);
    heap.add(2);
    heap.add(1);
    heap.add(0);
    expect(heap.size).toBe(4);
    expect(heap.toArray()).toEqual([0, 1, 2, 3]);
    expect(heap.valid).toBeTruthy();
  });

  it("should remove", () => {
    const heap = new MinPriorityQueue();
    heap.add(5);
    heap.add(100);
    heap.add(100000);
    heap.add(-10);
    heap.add(0);
    heap.add(5);
    expect(heap.valid).toBeTruthy();
  });
});
