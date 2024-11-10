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
    this.eventBus.subscribe(`searched`, this.#controlSearchResults.bind(this));
  }

  async #controlSearchResults(prompt) {
    this.#view.updateTitle(prompt);
    this.#view.hideSpinner();

    const pageBounds = getPageBounds(this.getState(`search.currentPage`), this.getState(`search.resultsPerPage`));
    console.log(this.getState);
    this.#view.renderResults(this.getState(`search.response`), pageBounds.start, pageBounds.end);
  }
}
