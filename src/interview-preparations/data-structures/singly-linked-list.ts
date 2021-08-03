export class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null) {}
}

/**
 * remove element at linked list
 *
 * @param position starts from zero (0)
 * @param head list head
 */
export function removeAt<T>(
  position: number,
  head: ListNode<T> | null
): ListNode<T> | null {
  if (position < 0) {
    throw new Error("out of range");
  }

  let current = head;
  let previous: ListNode<T> | null = null;

  for (let i = 0; i <= position; i++) {
    if (!current) {
      throw new Error("out of range");
    }

    // store previous if there is any
    if (i === position - 1) {
      previous = current;
    }

    // process node to remove
    if (i === position) {
      if (previous) {
        // link previous node if any
        previous.next = current.next;
      } else {
        // or unlink current and return new head
        head = current.next;
        current.next = null;
      }
    }

    current = current.next;
  }

  return head;
}

export function reverseSinglyLinkedList<T>(
  listNode: ListNode<T> | null
): ListNode<T> | null {
  let a: ListNode<T> | null = null;
  let b: ListNode<T> | null = listNode;
  let c: ListNode<T> | null = null;

  while (b) {
    // store next value
    c = b.next;
    // update current next pointer
    b.next = a;
    // move previous value
    a = b;
    // move next value
    b = c;
  }

  return a;
}

/**
 * Helpers
 */
export function createSinglyLinkedList<T>(input: T[]): ListNode<T> | null {
  if (input.length < 1) {
    return null;
  }
  return new ListNode(input[0], createSinglyLinkedList(input.slice(1)));
}

export function singlyLinkedListToArray<T>(listNode: ListNode<T> | null): T[] {
  let result: T[] = [];

  while (listNode) {
    result.push(listNode.value);
    listNode = listNode.next;
  }

  return result;
}
