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
    const prompt = this.#view.getSearchPrompt();
    console.log(prompt);
    await this.#model.searchRecipe(prompt);
  }

  init() {
    this.#view.handleSearch(this.#controlSearch.bind(this));
  }
}
