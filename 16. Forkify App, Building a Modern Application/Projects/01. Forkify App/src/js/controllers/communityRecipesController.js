import ResultsController from "./resultsController";
import CommunityRecipes from "../views/communityRecipesView";
import CommunityRecipesModel from "../models/communityRecipesModel";

export default class BookmarksController extends ResultsController {
  #model;
  #view;

  constructor(appState) {
    super(appState);

    this.#model = new CommunityRecipesModel(appState);
    this.#view = new CommunityRecipes();
    this.eventBus.subscribe(`OpenCommunityRecipes`, this.handler(this.#controlCommunityRecipesResults.bind(this)));
  }

  async #controlCommunityRecipesResults() {
    this.#view.removeCurrentResults();
    this.#view.updateTitle();
    this.#view.renderUploadRecipeBtn();

    const feedData = this.getState(`community`);

    const feed = this.#model.chackValidFeed(feedData) ? feedData.results : await this.#model.generateCommunityFeed();
    const { results, currentPage, totalPages } = this.#model.buildResultsData(feed);

    this.updateResults(results, currentPage, totalPages);

    this.#view.onUploadBtnClick(() => this.eventBus.publish(`OpenRecipeForm`, null));
  }
}
