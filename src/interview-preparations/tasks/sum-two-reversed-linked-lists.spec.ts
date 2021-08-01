import { addTwoNumbers } from "./sum-two-reversed-linked-lists";

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

describe("You are given two non-empty linked lists representing two non-negative integers. \
The digits are stored in reverse order, and each of their nodes contains a single digit. \
Add the two numbers and return the sum as a linked list. You may assume the two numbers do \
not contain any leading zero, except the number 0 itself. \
Constraints: \
The number of nodes in each linked list is in the range [1, 100]. \
0 <= Node.val <= 9 \
It is guaranteed that the list represents a number that does not have leading zeros.", () => {
  describe("helpers", () => {
    it.each([[[1, 2]], [[1, 4, 5]], [[9, 9, 9, 9, 9, 9, 9]], [[]]])(
      "should create and parse to num",
      (input) => {
        const list = createLinkedList(input);
        const arr = linkedListToNumArray(list);
        expect(arr).toEqual(input);
      }
    );
  });

  const inout: [[number[], number[]], number[]][] = [
    [
      [
        [9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9],
      ],
      [8, 9, 9, 9, 0, 0, 0, 1],
    ],
    [
      [[9, 9, 1], [1]],
      [0, 0, 2],
    ],
  ];

  it.each(inout)("should work", (input, expected) => {
    const result = addTwoNumbers(
      createLinkedList(input[0]),
      createLinkedList(input[1])
    );
    expect(linkedListToNumArray(result)).toEqual(expected);
  });
});

/**
 * Helpers below
 */

function createLinkedList(arr: number[]): ListNode | null {
  if (arr.length < 1) {
    return null;
  }

  return new ListNode(arr[0], createLinkedList(arr.slice(1)));
}

function linkedListToNumArray(list: ListNode | null): number[] {
  let result = [];
  while (list) {
    result.push(list.val);
    list = list.next;
  }

  return result;
}
