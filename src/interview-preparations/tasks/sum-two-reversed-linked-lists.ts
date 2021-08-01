import { ListNode } from "./sum-two-reversed-linked-lists.spec";

/**
 * Nota bene: lists might be of a different length.
 *
 * Solution analysis:
 * - complexity O(n) where n is the max length of 2 linked lists
 */

export function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
  carry: number = 0
): ListNode | null {
  if (l1 === null && l2 === null && carry === 0) {
    return null;
  }

  const sum = (l1?.val || 0) + (l2?.val || 0) + carry;

  return new ListNode(
    sum % 10,
    addTwoNumbers(l1?.next || null, l2?.next || null, sum >= 10 ? 1 : 0)
  );
}
