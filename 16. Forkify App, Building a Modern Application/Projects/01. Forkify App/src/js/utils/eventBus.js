export default class EventBus {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, callback) {
    this.subscribers[event] = this.subscribers[event] ?? [];
    this.subscribers[event].push(callback);
  }

  unsubscribe = (event, callback) => this.subscribers[event] && (his.subscribers[event] = this.subscribers[event].filter(c => c !== callback));

  publish = (event, data) => this.subscribers[event]?.forEach(callback => callback(data));
}
