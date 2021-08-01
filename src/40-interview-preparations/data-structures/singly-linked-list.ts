class LinkedListNode {
  constructor(public value: number, public next: LinkedListNode | null) {}

  toString(): string {
    return `${this.value} ${this.next?.toString() || ""}`;
  }
}

let firstNode = new LinkedListNode(
  1,
  new LinkedListNode(2, new LinkedListNode(3, new LinkedListNode(4, null)))
);

console.log("origin: ", firstNode.toString());

function reverseRecursive(
  currentNode: LinkedListNode,
  previousNode: LinkedListNode | null = null
): LinkedListNode {
  // store next pointer
  let next = currentNode.next;

  // reverse pointer
  currentNode.next = previousNode;

  // Return new root node if no more next
  if (next === null) {
    return currentNode;
  }

  // reverse next node
  return reverseRecursive(next, currentNode);
}

firstNode = reverseRecursive(firstNode);

console.log("reversed: ", firstNode.toString());

function reverse(node: LinkedListNode): LinkedListNode {
  let prev: LinkedListNode | null = null;
  let cursor: LinkedListNode = node;
  let next: LinkedListNode | null = null;

  while (true) {
    console.log(cursor);
    next = cursor.next; // move next
    cursor.next = prev; // relink
    prev = cursor; // move prev

    if (!next) {
      return cursor; // return if nothing to reverse next
    }

    cursor = next; // move cursor
  }
}

console.log(`reverse back: ${reverse(firstNode).toString()}`);
