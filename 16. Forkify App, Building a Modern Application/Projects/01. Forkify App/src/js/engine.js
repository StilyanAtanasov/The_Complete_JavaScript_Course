import AppState from "./appState";
import SearchResultsController from "./controllers/searchResultsController";
import PopularResultsController from "./controllers/popularResultsController";
import SearchController from "./controllers/searchController";
import RecipeController from "./controllers/recipeController";

export default class Engine {
  #popularResultsController;
  #searchController;
  #recipeController;
  #appState;

  constructor() {
    this.#appState = new AppState();
    this.#searchController = new SearchController(this.#appState);
    this.#recipeController = new RecipeController(this.#appState);
    this.#popularResultsController = new PopularResultsController(this.#appState);
    new SearchResultsController(this.#appState);
  }

  start() {
    this.#searchController.init();
    this.#recipeController.init();
    this.#popularResultsController.init();
  }
}
