import {
  createSinglyLinkedList,
  removeAt,
  reverseSinglyLinkedList,
  singlyLinkedListToArray,
} from "./singly-linked-list";

describe("ListNode", () => {
  it.each([
    [[], []],
    [[1], [1]],
    [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ])("should create ListNode", (input, expected) => {
    const head = createSinglyLinkedList(input);
    expect(singlyLinkedListToArray(head)).toEqual(expected);
  });

  it.each([
    [[], []],
    [
      [1, 2],
      [2, 1],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ],
  ])("should reverse singly linked list", (input, expected) => {
    const head = createSinglyLinkedList(input);
    const reversed = reverseSinglyLinkedList(head);
    const resultAsArray = singlyLinkedListToArray(reversed);

    expect(resultAsArray).toEqual(expected);
  });

  it.each([
    [
      {
        listFrom: [],
        removeAt: 0,
        shouldThrow: true,
      },
    ],
    [
      {
        listFrom: [1],
        removeAt: 0,
        expected: [],
      },
    ],
    [
      {
        listFrom: [0, 1, 2, 3, 4, 5, 6],
        removeAt: 6,
        expected: [0, 1, 2, 3, 4, 5],
      },
    ],
    [
      {
        listFrom: [0, 1, 2, 3],
        removeAt: 1,
        expected: [0, 2, 3],
      },
    ],
  ])("should removeAt", (data) => {
    const head = createSinglyLinkedList(data.listFrom);

    if ("shouldThrow" in data) {
      expect(() => removeAt(data.removeAt, head)).toThrow();
    } else {
      const modifiedList = removeAt(data.removeAt, head);
      const result = singlyLinkedListToArray(modifiedList);
      expect(result).toEqual(data.expected);
    }
  });
});
