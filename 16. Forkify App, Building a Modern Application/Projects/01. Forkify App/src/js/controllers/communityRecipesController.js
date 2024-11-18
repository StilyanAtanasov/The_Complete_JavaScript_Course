import ResultsController from "./resultsController";
import CommunityRecipes from "../views/communityRecipesView";

export default class BookmarksController extends ResultsController {
  #view;

  constructor(appState) {
    super(appState);

    this.#view = new CommunityRecipes();
    this.eventBus.subscribe(`OpenCommunityRecipes`, this.#controlCommunityRecipesResults.bind(this));
  }

  #controlCommunityRecipesResults() {
    this.#view.updateTitle();
  }
}
