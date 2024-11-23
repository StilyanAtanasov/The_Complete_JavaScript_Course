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

    this.eventBus.subscribe(`RecipeSlideIn`, this.#controlSlideRecipe.bind(this, true));
    this.eventBus.subscribe(`RecipeSlideOut`, this.#controlSlideRecipe.bind(this, false));
  }

  async #controlRecipe(hash) {
    const recipeId = hash.slice(1);
    if (!recipeId) return;

    this.#view.removeCurrentRecipe();
    this.#view.showSpinner();

    const { id, title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl } = await this.#model.fetchRecipe(recipeId);
    this.#view.renderRecipe(title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl, this.#isBookmarked(id));

    this.#view.onReturnBack(() => this.#controlSlideRecipe(false));

    this.#view.onUpdateServings(
      function (arg) {
        this.#model.updateServings(arg);
        const { title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl } = this.getState(`currentRecipe`);
        this.#view.update(this.#view.recipeMarkup(title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl));
      }.bind(this)
    );

    this.#view.onBookmark(
      function () {
        this.eventBus.publish(`bookmark`, {
          id: this.getState(`currentRecipe.id`),
          title: this.getState(`currentRecipe.title`),
          image_url: this.getState(`currentRecipe.imageUrl`),
          publisher: this.getState(`currentRecipe.publisher`),
        });
      }.bind(this)
    );
  }

  #controlSlideRecipe = (slideIn = true) => (slideIn ? this.#view.slideIn() : this.#view.slideOut());

  #isBookmarked = id => this.getState(`bookmarks`).reduce((acc, b) => acc || b.id === id, false);

  init = () => this.#view.onHashChange(this.#controlRecipe.bind(this));
}
