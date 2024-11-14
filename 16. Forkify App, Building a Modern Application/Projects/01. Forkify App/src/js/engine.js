import AppState from "./appState";
import SearchResultsController from "./controllers/searchResultsController";
import SearchController from "./controllers/searchController";

export default class Engine {
  #searchController;
  #appState;

  constructor() {
    this.#appState = new AppState();
    this.#searchController = new SearchController(this.#appState);
    new SearchResultsController(this.#appState);
  }

  start = () => this.#searchController.init();
}
