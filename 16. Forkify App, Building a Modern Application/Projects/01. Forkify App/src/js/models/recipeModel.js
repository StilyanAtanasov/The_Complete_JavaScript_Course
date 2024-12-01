import { RECIPE_HISTORY_LENGTH } from "../config/config";
import FixedQueue from "../utils/fixedQueue";
import { timeout } from "../utils/utils";
import Model from "./model";

export default class RecipeModel extends Model {
  constructor(appState) {
    super(appState);
  }

  checkHistory(id) {
    const recipeHistory = this.appState.getState(`recipeHistory`).getQueue();

    const found = recipeHistory.find(h => h.id === id);
    return found || false;
  }

  syncLocalStorage = recipeHistory => recipeHistory && window.localStorage.setItem(`recipeHistory`, JSON.stringify(recipeHistory));
  initRecipeHistory = () => this.appState.updateState(`recipeHistory`, FixedQueue.from(JSON.parse(window.localStorage.getItem(`recipeHistory`)), RECIPE_HISTORY_LENGTH));

  updateHistory(recipe) {
    if (!recipe) return;
    const newHistory = this.appState.getState(`recipeHistory`).enqueue(recipe);
    this.syncLocalStorage(newHistory.getQueue());
  }

  updateCurrentRecipe = (title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl, custom, directions, isBookmarked) =>
    this.appState.updateState(`currentRecipe`, {
      title,
      cookingTime,
      imageUrl,
      ingredients,
      publisher,
      servings,
      sourceUrl,
      custom,
      isBookmarked,
      directions,
    });

  async fetchRecipe(id) {
    try {
      const response = await Promise.race([
        fetch(`.netlify/functions/getRecipeById`, {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify({ id }),
        }),
        timeout(5000, `Search request took too long!`),
      ]);

      if (!response.ok) throw new Error(`Error fetching recipe: ${(await response.json()).message}`);

      const data = await response.json();
      if (!data) throw new Error();

      const recipe = data.data;

      this.appState.updateState(`currentRecipe`, recipe);
      this.updateHistory(recipe);

      return recipe;
    } catch (err) {
      console.log(err);
      throw new Error(`Error finding desired recipe!`);
    }
  }

  updateServings(updateBy) {
    try {
      const currentServings = this.appState.getState(`currentRecipe.servings`);
      const newServings = currentServings + updateBy;
      if (newServings <= 0 || newServings > 1000) return;

      const multiplier = newServings / currentServings;

      this.appState.updateState(
        `currentRecipe.ingredients`,
        this.appState.getState(`currentRecipe.ingredients`).map(({ description, unit, quantity }) => ({
          description,
          unit,
          quantity: quantity * multiplier,
        }))
      );

      this.appState.updateState(`currentRecipe.servings`, newServings);
    } catch {
      throw new Error(`Error updating servings right now!`);
    }
  }
}
