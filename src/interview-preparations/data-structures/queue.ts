/**
 * Queue: first in, first out
 *             head     tail
 * 6->(queue)-> [5-4-3-2] ->(dequeue)->1
 */

export class QueueListNode<T> {
  constructor(public value: T, public next: QueueListNode<T> | null = null) {}
}

export class Queue<T> {
  public head: QueueListNode<T> | null = null;

  public get size(): number {
    let i = 0;
    let current = this.head;

    while (current) {
      current = current.next;
      i++;
    }

    return i;
  }

  public queue(value: T) {
    this.head = new QueueListNode(value, this.head);
  }

  public dequeue(): QueueListNode<T> | null {
    let current = this.head;

    // none
    if (!current) {
      return null;
    }

    // single item
    if (!current.next) {
      this.head = null;
      return current;
    }

    // multiple items
    while (current.next?.next) {
      current = current.next;
    }

    // Strore node to returen
    let result = current.next;
    // unlink node to dequeue
    current.next = null;

    return result;
  }
}
