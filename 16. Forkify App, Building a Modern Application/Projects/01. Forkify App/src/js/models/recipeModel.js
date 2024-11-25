import Model from "./model";
import { API_URL } from "../config/config";

export default class RecipeModel extends Model {
  constructor(appState) {
    super(appState);
  }

  async fetchRecipe(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error();

      const data = await response.json();
      if (!data) throw new Error();

      const recipe = data.data.recipe;
      const recipeData = {
        title: recipe.title,
        id: recipe.id,
        imageUrl: recipe.image_url,
        cookingTime: recipe.cooking_time,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
      };

      this.appState.updateState(`currentRecipe`, recipeData);

      return recipeData;
    } catch {
      throw new Error(`Error finding desired recipe!`);
    }
  }

  updateServings(updateBy) {
    try{
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
  }
  catch {
    throw new Error(`Error updating servings right now!`);
  }
  }
}
