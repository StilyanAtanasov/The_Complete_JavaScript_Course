import ResultsView from "../views/resultsView";
import Controller from "./controller";
import { getPageBounds } from "../utils/utils";
import { PAGE_RESULTS_LIMIT } from "../config/config";

export default class ResultsController extends Controller {
  #view;

  constructor(appState) {
    super(appState);

    this.#view = new ResultsView();
    this.eventBus.subscribe(`RecipeRequested`, this.handler(this.#controlUpdateCurrentPreview.bind(this)));
  }

  updateResults(results, currentPage, totalPages, resultsCleanFunc = this.#view.removeCurrentResults.bind(this.#view)) {
    try {
      this.#view.removeListeners();

      const pageBounds = getPageBounds(currentPage, PAGE_RESULTS_LIMIT, results.length);

      this.#view.renderResults(results, pageBounds.start, pageBounds.end, this.getState(`currentRecipe.id`));
      this.#view.renderPagination(currentPage, totalPages);

      this.#view.onPaginationClick(
        function (changeBy) {
          resultsCleanFunc();
          this.updateResults(results, currentPage + changeBy, totalPages, resultsCleanFunc);
        }.bind(this)
      );

      this.#view.onResultClick(this.handler((title => title === this.getState(`currentRecipe`).title && this.eventBus.publish(`RecipeSlideIn`, null)).bind(this)));
    } catch (err) {
      console.log(err.message);
      throw new Error(`Error updating results!`);
    }
  }

  #controlUpdateCurrentPreview = id => this.#view.changeCurrentRecipe(id);
}
