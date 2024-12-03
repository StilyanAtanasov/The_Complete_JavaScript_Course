import ResultsController from "./resultsController";
import SearchResultsView from "../views/searchResultsView";
import SearchResultsModel from "../models/searchResultsModel";

export default class SearchResultsController extends ResultsController {
  #model;
  #view;

  constructor(appState) {
    super(appState);
    this.#model = new SearchResultsModel(appState);
    this.#view = new SearchResultsView();
    this.eventBus.subscribe(`searched`, this.handler(this.#controlSearchResults.bind(this)));
  }

  async #controlSearchResults(prompt, response) {
    this.#view.updateTitle(prompt);
    this.#view.hideSpinner();
    this.#model.changeResultsPage();

    if (!response) {
      this.#view.renderNotification(`No results found!`, 4000);
      return;
    }

    this.#view.displaySortBtn();

    const { results, currentPage, totalPages } = this.#model.buildResultsData(response);

    this.#controlSortResults(results, currentPage, totalPages, this.getState(`results.currentSort`));
    this.#view.onSortClick(this.handler(this.#controlSortResults.bind(this, results, currentPage, totalPages)));
  }

  #controlSortResults(results, currentPage, totalPages, index = this.getState(`results.currentSort`) + 1) {
    const { name: sortMessage, func: sortFunc } = this.#model.getSortFunction(index);

    this.#view.removeCurrentPreviews();
    this.#view.changeSortButtonText(sortMessage);
    this.updateResults(sortFunc(results), currentPage, totalPages, this.#view.removeCurrentPreviews);
  }
}
