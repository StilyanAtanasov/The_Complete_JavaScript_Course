import SearchModel from "../models/searchModel";
import SearchView from "../views/searchView";
import Controller from "./controller";

export default class SearchController extends Controller {
  #model;
  #view;

  constructor(appState) {
    super(appState);
    this.#model = new SearchModel(appState);
    this.#view = new SearchView();
  }

  async #controlSearch() {
    this.#view.updateTitle();
    this.#view.removeCurrentResults();
    this.#view.showSpinner();

    const prompt = this.#view.getSearchPrompt();
    this.#view.clearInputField();

    await this.#model.searchRecipe(prompt);
    this.eventBus.publish(`searched`, prompt);
  }

  init = () => this.#view.onSearch(this.#controlSearch.bind(this));
}
