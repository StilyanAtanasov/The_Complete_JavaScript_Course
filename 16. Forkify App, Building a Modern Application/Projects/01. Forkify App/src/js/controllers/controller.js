import EventBus from "../utils/eventBus";

export default class Controller {
  #appState;

  constructor(appState) {
    this.#appState = appState;
    this.eventBus = Controller.eventBus ?? (Controller.eventBus = new EventBus());
  }

  getState = keyPath => this.#appState.getState(keyPath);
}
