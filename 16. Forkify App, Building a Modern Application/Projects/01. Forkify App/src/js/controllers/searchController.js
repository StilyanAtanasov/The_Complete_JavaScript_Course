import SearchModel from "../models/searchModel";
import SearchView from "../views/searchView";
import Controller from "./controller";

export default class SearchController extends Controller {
  #model;
  #view;

  constructor() {
    super();
    this.#model = new SearchModel();
    this.#view = new SearchView();
  }

  async #controlSearch() {
    this.#view.renderSpinner(this.#view.UIEls.results.title);
    this.#view.updateText(this.#view.UIEls.results.title, `Searching...`);

    const prompt = this.#view.getSearchPrompt();
    this.#view.clearInputField();

    const response = await this.#model.searchRecipe(prompt);

    this.appState.search.query = prompt;
    this.appState.search.response = response.data.recipes;

    this.eventBus.publish(`searched`, prompt);
  }

  init() {
    this.#view.handleSearch(this.#controlSearch.bind(this));
  }
}
