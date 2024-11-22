import Model from "./model";
import { MAX_INGREDIENTS_COUNT } from "../config/config";

export default class RecipeFormModel extends Model {
  constructor(appState) {
    super(appState);
  }

  updateIngredientsCount(incrementBy) {
    const newIngredientsCount = this.appState.getState(`uploadRecipe.ingredientsCount`) + incrementBy;
    if (newIngredientsCount > MAX_INGREDIENTS_COUNT) return false;

    this.appState.updateState(`uploadRecipe.ingredientsCount`, newIngredientsCount);
    return true;
  }

  createRecipe(data) {
    const ingredients = [];
    const recipe = { ...Object.fromEntries([...data]), source_url: `no-source` };

    for (const key in recipe) {
      if (key.startsWith(`ingredient`)) {
        const [_, index, field] = key.split(`-`);
        const ingredientIndex = parseInt(index, 10) - 1;

        if (!ingredients[ingredientIndex]) ingredients[ingredientIndex] = { description: ``, quantity: ``, unit: `` };

        if (field === `name`) ingredients[ingredientIndex].description = recipe[key];
        if (field === `quantity`) ingredients[ingredientIndex].quantity = recipe[key];
        if (field === `unit`) ingredients[ingredientIndex].unit = recipe[key];

        delete recipe[key];
      }
    }

    if (!recipe.title.includes(`**custom**`)) recipe.title = `**custom** ${recipe.title}`;
    recipe.ingredients = ingredients;
    return recipe;
  }

  async submitRecipe(recipe) {
    try {
      const response = await fetch(`.netlify/functions/publishRecipe`, {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) throw new Error(`Failed to fetch recipe: ${response.statusText ?? ``}`);
      const data = await response.json();

      console.log(data);
      console.log(`Recipe submitted successfully`); // FIX
      return data;
    } catch (err) {
      console.error(err.message); // TODO
    }
  }
}
