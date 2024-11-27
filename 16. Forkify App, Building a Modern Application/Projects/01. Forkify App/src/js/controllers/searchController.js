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
    const prompt = this.#view.getSearchPrompt();
    this.#view.clearInputField();

    if(!this.#model.validateSearch(prompt)) return;  
      this.#view.updateTitle();
    this.#view.removeCurrentResults();
    this.eventBus.publish(`RecipeSlideOut`, null);
    this.#view.showSpinner();

    await this.#model.searchRecipe(prompt);
    this.eventBus.publish(`searched`, prompt);
  }

  init = () => this.#view.onSearch(this.handler(this.#controlSearch.bind(this)));
}
