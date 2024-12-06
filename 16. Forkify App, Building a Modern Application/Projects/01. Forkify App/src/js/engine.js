import AppState from "./appState";
import SearchResultsController from "./controllers/searchResultsController";
import FeedResultsController from "./controllers/feedResultsController";
import SearchController from "./controllers/searchController";
import RecipeController from "./controllers/recipeController";
import BookmarksController from "./controllers/bookmarksController";
import CommunityRecipesController from "./controllers/communityRecipesController";
import NavController from "./controllers/navController";
import RecipeFormController from "./controllers/recipeFormController";
import ShoppingListController from "./controllers/shoppingListController";
import LocationController from "./controllers/locationController";
import AdminController from "./controllers/adminController";

export default class Engine {
  #appState;
  #feedResultsController;
  #communityResultsController;
  #searchController;
  #recipeController;
  #bookmarksController;
  #navController;
  #locationController;

  constructor() {
    this.#appState = new AppState();
    this.#searchController = new SearchController(this.#appState);
    this.#recipeController = new RecipeController(this.#appState);
    this.#feedResultsController = new FeedResultsController(this.#appState);
    this.#bookmarksController = new BookmarksController(this.#appState);
    this.#navController = new NavController(this.#appState);
    this.#locationController = new LocationController(this.#appState);
    this.#communityResultsController = new CommunityRecipesController(this.#appState);

    new SearchResultsController(this.#appState);
    new RecipeFormController(this.#appState);
    new ShoppingListController(this.#appState);
    new AdminController(this.#appState);
  }

  start() {
    this.#locationController.init();
    this.#searchController.init();
    this.#recipeController.init();
    this.#feedResultsController.init();
    this.#bookmarksController.init();
    this.#navController.init();
    this.#communityResultsController.init();
  }
}
