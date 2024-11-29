import ResultsController from "./resultsController";
import FeedResultsView from "../views/feedResultsView";
import FeedResultsModel from "../models/feedResultsModel";

export default class FeedResultsController extends ResultsController {
  #model;
  #view;

  constructor(appState) {
    super(appState);

    this.#model = new FeedResultsModel(appState);
    this.#view = new FeedResultsView();
    this.eventBus.subscribe(`OpenFeed`, this.handler(this.#controlFeed.bind(this)));
  }

  async #controlFeed() {
    this.#view.removeCurrentResults();
    this.#view.showSpinner();

    this.#view.updateTitle();
    const feedData = this.getState(`feed`);

    const feed = this.#model.chackValidFeed(feedData) ? feedData.results : await this.#model.generateFeed();
    const { results, currentPage, totalPages } = this.#model.buildResultsData(feed);

    this.updateResults(results, currentPage, totalPages);
    this.#view.hideSpinner();
  }

  init() {
    this.#model.getStoredFeed();
    this.handler(this.#controlFeed.bind(this))();
    this.eventBus.publish(`UpdatePage`, `FeedRecipes`);
  }
}
