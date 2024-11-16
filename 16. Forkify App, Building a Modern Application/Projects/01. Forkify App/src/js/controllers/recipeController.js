import RecipeModel from "../models/recipeModel";
import RecipeView from "../views/recipeView";
import Controller from "./controller";

export default class ResultsController extends Controller {
  #model;
  #view;

  constructor(appState) {
    super(appState);

    this.#model = new RecipeModel(appState);
    this.#view = new RecipeView();
  }

  async controlRecipe(hash) {
    const recipeId = hash.slice(1);
    if (!recipeId) return;

    this.#view.removeCurrentRecipe();
    this.#view.showSpinner();

    const { title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl } = await this.#model.fetchRecipe(recipeId);
    this.#view.renderRecipe(title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl);

    this.#view.onUpdateServings(
      function (arg) {
        this.#model.updateServings(arg);
        const { title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl } = this.getState(`currentRecipe`);
        this.#view.update(this.#view.recipeMarkup(title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl));
      }.bind(this)
    );
  }

  init = () => this.#view.onHashChange(this.controlRecipe.bind(this));
}
