import EventBus from "../utils/eventBus";
import View from "../views/view";

export default class Controller {
  #appState;
  #view;

  constructor(appState) {
    this.#appState = appState;
    this.eventBus = Controller.eventBus ?? (Controller.eventBus = new EventBus());
    this.#view = new View();
  }

  getState = keyPath => this.#appState.getState(keyPath);

  handler =
    fn =>
    async (...args) => {
      try {
        return await fn(...args);
      } catch (err) {
        console.error(err);
        this.#view.renderNotification(err.message, 6000, true);
      }
    };
}
