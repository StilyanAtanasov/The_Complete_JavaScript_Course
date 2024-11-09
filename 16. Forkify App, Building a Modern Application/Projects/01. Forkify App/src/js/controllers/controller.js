import EventBus from "../utils/eventBus";
import AppState from "../appState";

export default class Controller {
  constructor() {
    this.appState = Controller.appState ?? (Controller.appState = new AppState().appState);
    this.eventBus = Controller.eventBus ?? (Controller.eventBus = new EventBus());
  }
}
