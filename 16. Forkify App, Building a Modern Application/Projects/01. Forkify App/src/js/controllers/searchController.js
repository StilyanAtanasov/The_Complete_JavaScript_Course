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
    const prompt = this.#model.validateSearchQuery(this.#view.getSearchPrompt());
    this.#view.clearInputField();

    this.#view.updateTitle();
    this.#view.removeCurrentResults();
    this.eventBus.publish(`RecipeSlideOut`, null);
    this.#view.showSpinner();

    const stored = this.#model.checkHistory(prompt);
    const response = stored || (await this.#model.searchRecipe(prompt));
    this.eventBus.publish(`searched`, prompt, response);
  }

  init = () => this.#view.onSearch(this.handler(this.#controlSearch.bind(this)));
}
