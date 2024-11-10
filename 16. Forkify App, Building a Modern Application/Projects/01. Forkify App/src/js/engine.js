import AppState from "./appState";
import ResultsController from "./controllers/resultsController";
import SearchController from "./controllers/searchController";

export default class Engine {
  #searchController;
  #appState;

  constructor() {
    this.#appState = new AppState();
    this.#searchController = new SearchController(this.#appState);
    new ResultsController(this.#appState);
  }

  start = () => this.#searchController.init();
}
