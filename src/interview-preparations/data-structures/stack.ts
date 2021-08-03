class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}

export class MyStack<T> {
  public head: ListNode<T> | null = null;

  public get size(): number {
    let i = 0;
    let element = this.head;

    while (element) {
      element = element.next;
      i++;
    }

    return i;
  }

  public push(value: T) {
    this.head = new ListNode(value, this.head);
  }

  public pop(): ListNode<T> | null {
    if (this.head) {
      const popped = this.head;
      this.head = this.head.next;
      popped.next = null;
      return popped;
    }

    return null;
  }
}
