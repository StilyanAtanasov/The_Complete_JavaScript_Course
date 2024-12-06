import Model from "./model";
import { MAX_INGREDIENTS_COUNT, MIN_INGREDIENTS_COUNT } from "../config/config";
import { timeout } from "../utils/utils";

export default class RecipeFormModel extends Model {
  constructor(appState) {
    super(appState);
  }

  updateIngredientsCount(incrementBy) {
    try {
      const newIngredientsCount = this.appState.getState(`uploadRecipe.ingredientsCount`) + incrementBy;
      if (newIngredientsCount > MAX_INGREDIENTS_COUNT) throw new Error(`Recipe could consist of maximum ${MAX_INGREDIENTS_COUNT} ingredients`);

      this.appState.updateState(`uploadRecipe.ingredientsCount`, newIngredientsCount);
      return newIngredientsCount === MAX_INGREDIENTS_COUNT;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  removeIngredient() {
    const currentIngredientsCount = +this.appState.getState(`uploadRecipe.ingredientsCount`);
    if (currentIngredientsCount === MIN_INGREDIENTS_COUNT) throw new Error(`Recipe must have at least ${MIN_INGREDIENTS_COUNT} ingredient!`);

    this.appState.updateState(`uploadRecipe.ingredientsCount`, currentIngredientsCount - 1);
    return currentIngredientsCount === MAX_INGREDIENTS_COUNT;
  }

  createRecipe(data) {
    try {
      const ingredients = [];
      const recipe = { ...Object.fromEntries([...data]), source_url: `no-source` };
      console.log(recipe);

      for (const key in recipe) {
        if (key.startsWith(`ingredient`)) {
          const [_, index, field] = key.split(`-`);
          const ingredientIndex = parseInt(index, 10) - 1;

          if (!ingredients[ingredientIndex]) ingredients[ingredientIndex] = { description: ``, quantity: ``, unit: `` };

          if (field === `name`) ingredients[ingredientIndex].description = recipe[key];
          else if (field === `quantity`) ingredients[ingredientIndex].quantity = recipe[key];
          else if (field === `unit`) ingredients[ingredientIndex].unit = recipe[key];

          delete recipe[key];
        } else if (key === `cooking__directions`) {
          ingredients.push({ description: `**directions** ${recipe[key]}`, quantity: ``, unit: `` });
          delete recipe[key];
        }
      }

      recipe.ingredients = ingredients;
      return recipe;
    } catch {
      throw new Error(`Error creating your recipe! Try again later!`);
    }
  }

  async submitRecipe(recipe) {
    try {
      const response = await Promise.race([
        fetch(`.netlify/functions/publishRecipe`, {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify(recipe),
        }),
        timeout(5000, `Search request took too long!`),
      ]);

      if (!response.ok) throw new Error(`Error submitting your recipe! Try again later!`);
      const data = await response.json();

      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
