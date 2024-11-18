import ResultsController from "./resultsController";
import PopularResultsView from "../views/popularResultsView";
import PopularResultsModel from "../models/popularResultsModel";

export default class PopularResultsController extends ResultsController {
  #model;
  #view;

  constructor(appState) {
    super(appState);

    this.#model = new PopularResultsModel(appState);
    this.#view = new PopularResultsView();
  }

  async #controlPopularRecipes() {
    this.#view.showSpinner();

    this.#view.updateTitle();
    await this.#model.getPopularRecipes();

    this.updateResults();
    this.#view.hideSpinner();
  }

  init = () => this.#controlPopularRecipes();
}
