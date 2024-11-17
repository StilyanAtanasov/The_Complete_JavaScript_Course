import AppState from "./appState";
import SearchResultsController from "./controllers/searchResultsController";
import PopularResultsController from "./controllers/popularResultsController";
import SearchController from "./controllers/searchController";
import RecipeController from "./controllers/recipeController";
import BookmarksController from "./controllers/bookmarksController";
import NavController from "./controllers/navController";

export default class Engine {
  #appState;
  #popularResultsController;
  #searchController;
  #recipeController;
  #bookmarksController;
  #navController;

  constructor() {
    this.#appState = new AppState();
    this.#searchController = new SearchController(this.#appState);
    this.#recipeController = new RecipeController(this.#appState);
    this.#popularResultsController = new PopularResultsController(this.#appState);
    this.#bookmarksController = new BookmarksController(this.#appState);
    this.#navController = new NavController(this.#appState);
    new SearchResultsController(this.#appState);
  }

  start() {
    this.#searchController.init();
    this.#recipeController.init();
    this.#popularResultsController.init();
    this.#bookmarksController.init();
    this.#navController.init();
  }
}
