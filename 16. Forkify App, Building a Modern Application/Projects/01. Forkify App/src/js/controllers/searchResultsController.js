import ResultsController from "./resultsController";
import ResultsModel from "../models/resultsModel";
import SearchResultsView from "../views/searchResultsView";

export default class SearchResultsController extends ResultsController {
  #model;
  #view;

  constructor(appState) {
    super(appState);
    this.#model = new ResultsModel(appState);
    this.#view = new SearchResultsView();
    this.eventBus.subscribe(`searched`, this.handler(this.#controlSearchResults.bind(this)));
  }

  async #controlSearchResults(prompt) {
    this.#view.updateTitle(prompt);
    this.#view.hideSpinner();

    this.updateResults();
  }
}
