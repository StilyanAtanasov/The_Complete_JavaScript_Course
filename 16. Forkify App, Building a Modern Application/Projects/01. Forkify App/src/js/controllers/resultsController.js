import ResultsModel from "../models/resultsModel";
import ResultsView from "../views/resultsView";
import Controller from "./controller";
import { getPageBounds } from "../utils/utils";

export default class ResultsController extends Controller {
  #model;
  #view;

  constructor(appState) {
    super(appState);

    this.#model = new ResultsModel(appState);
    this.#view = new ResultsView();
  }

  updateResults() {
    this.#view.removePaginationClickListener();

    const currentPage = this.getState(`search.currentPage`);
    const recipes = this.getState(`search.response`);
    const pageBounds = getPageBounds(currentPage, this.getState(`search.resultsPerPage`), recipes.length);

    this.#view.renderResults(recipes, pageBounds.start, pageBounds.end);
    this.#view.renderPagination(currentPage, this.getState(`search.totalPages`));

    this.#view.onPaginationClick(
      function (arg) {
        this.#model.updateResultsPage(arg);
        this.updateResults();
      }.bind(this)
    );
  }
}
