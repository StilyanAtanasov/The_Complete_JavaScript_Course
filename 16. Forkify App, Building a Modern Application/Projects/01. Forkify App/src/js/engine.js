import SearchController from "./controllers/searchController";

export default class Engine {
  #searchController;

  constructor() {
    this.#searchController = new SearchController();
  }

  start() {
    this.#searchController.init();
  }
}
