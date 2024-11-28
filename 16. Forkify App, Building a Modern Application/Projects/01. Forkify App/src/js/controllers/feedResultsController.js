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

    console.log(this.getState(`feed`));
    const feed = this.getState(`feed`).length !== 0 ? this.getState(`feed`) : await this.#model.generateFeed();

    this.updateResults(feed);
    this.#view.hideSpinner();
  }

  init() {
    this.#model.getStoredFeed();
    this.handler(this.#controlFeed())();
    this.eventBus.publish(`UpdatePage`, `FeedRecipes`);
  }
}
