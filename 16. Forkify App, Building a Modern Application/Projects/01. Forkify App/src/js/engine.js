import ResultsController from "./controllers/resultsController";
import SearchController from "./controllers/searchController";

export default class Engine {
  #searchController;

  constructor() {
    this.#searchController = new SearchController();
    new ResultsController();
  }

  start() {
    this.#searchController.init();
  }
}
