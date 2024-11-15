import AppState from "./appState";
import SearchResultsController from "./controllers/searchResultsController";
import SearchController from "./controllers/searchController";
import RecipeController from "./controllers/recipeController";

export default class Engine {
  #searchController;
  #recipeController;
  #appState;

  constructor() {
    this.#appState = new AppState();
    this.#searchController = new SearchController(this.#appState);
    this.#recipeController = new RecipeController(this.#appState);
    new SearchResultsController(this.#appState);
  }

  start() {
    this.#searchController.init();
    this.#recipeController.init();
  }
}
