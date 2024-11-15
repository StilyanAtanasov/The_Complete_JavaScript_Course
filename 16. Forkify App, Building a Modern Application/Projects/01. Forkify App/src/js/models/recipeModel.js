import Model from "./model";
import { API_URL } from "../config/config";

export default class RecipeModel extends Model {
  constructor(appState) {
    super(appState);
  }

  async fetchRecipe(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error(`Error fetching recipe`);

      const data = await response.json();
      if (!data) throw new Error(`Error reading recipe data`);

      const recipe = data.data.recipe;
      const recipeData = {
        cookingTime: recipe.cooking_time,
        id: recipe.id,
        imageUrl: recipe.image_url,
        ingredients: recipe.ingredients,
        publisher: recipe.publisher,
        servings: recipe.servings,
        sourceUrl: recipe.source_url,
        title: recipe.title,
      };

      this.appState.updateState(`currentRecipe`, recipeData);

      return recipeData;
    } catch (err) {
      console.error(err.message); // TODO
    }
  }
}
