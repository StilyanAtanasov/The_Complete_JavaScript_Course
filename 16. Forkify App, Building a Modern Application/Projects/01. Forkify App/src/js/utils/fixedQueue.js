export default class FixedQueue {
  #queue;

  constructor(size) {
    this.#queue = [];
    this.size = size;
  }

  enqueue(element) {
    if (this.#queue.length >= this.size) this.#queue.shift();
    this.#queue.push(element);

    return this;
  }

  getQueue = () => this.#queue;

  #storeItems = items => items && (this.#queue = items.slice(0, this.size));

  static from(data, size) {
    if (!data) return;

    const instance = new FixedQueue(size);
    instance.#storeItems(data);

    return instance;
  }
}
