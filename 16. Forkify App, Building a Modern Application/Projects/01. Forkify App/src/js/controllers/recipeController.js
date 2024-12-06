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

    this.eventBus.subscribe(`RecipeSlideIn`, this.handler(this.#controlSlideRecipe.bind(this, true)));
    this.eventBus.subscribe(`RecipeSlideOut`, this.handler(this.#controlSlideRecipe.bind(this, false)));
    this.eventBus.subscribe(`RecipeRequested`, this.handler(this.#controlRecipe.bind(this)));
    this.eventBus.subscribe(`FetchRecipe`, this.handler(this.#controlFetchRecipe.bind(this)));
  }

  async #controlFetchRecipe({ sender, id, alwaysFetch = false }) {
    try {
      if (!id) return;

      let recipe;
      if (alwaysFetch) recipe = await this.#model.fetchRecipe(id);
      else {
        const stored = this.#model.checkHistory(id);
        recipe = stored ? stored : await this.#model.fetchRecipe(id);
      }

      if (sender) this.eventBus.publish(sender, recipe);
      else return recipe;
    } catch (err) {
      if (sender) {
        this.eventBus.publish(sender, { err: err.message });
        return;
      }

      throw new Error(err.message);
    }
  }

  async #controlRecipe(hash) {
    const recipeId = hash;
    if (!recipeId) return;

    this.#view.removeCurrentRecipe();
    this.#view.showSpinner();

    const { id, title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl, verified, directions } = await this.#controlFetchRecipe({ sender: null, id: recipeId });
    const isBookmarked = this.#isBookmarked(id);
    this.#view.renderRecipe(title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl, verified, directions, isBookmarked);
    this.#model.updateCurrentRecipe(id, title, ingredients, servings);
    this.#controlSlideRecipe();

    this.#view.onReturnBack(() => this.#controlSlideRecipe(false));

    this.#view.onAddAllProducts(() => this.eventBus.publish(`AddProduct`, this.getState(`currentRecipe.ingredients`)));
    this.#view.onAddProduct((quantity, unit, description) => this.eventBus.publish(`AddProduct`, [{ quantity, unit, description }]));

    this.#view.onUpdateServings(
      function (arg) {
        this.#model.updateServings(arg);
        const { title, ingredients, servings } = this.getState(`currentRecipe`);
        this.#view.update(this.#view.recipeMarkup(title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl, verified, directions, isBookmarked));
      }.bind(this)
    );

    this.#view.onBookmark((() => this.eventBus.publish(`bookmark`, { id, title, image_url: imageUrl, publisher, verified })).bind(this));
  }

  #controlSlideRecipe = (slideIn = true) => (slideIn ? this.#view.slideIn() : this.#view.slideOut());

  #isBookmarked = id => this.getState(`bookmarks`).reduce((acc, b) => acc || b.id === id, false);

  init = () => this.#model.initRecipeHistory();
}
