import Model from "./model";
import { MAX_INGREDIENTS_COUNT, MAX_STEPS_COUNT, MIN_INGREDIENTS_COUNT, MIN_STEPS_COUNT } from "../config/config";
import { timeout } from "../utils/utils";

export default class RecipeFormModel extends Model {
  constructor(appState) {
    super(appState);
  }

  updateCount(key, incrementBy, max) {
    const newCount = this.appState.getState(key) + incrementBy;

    if (newCount > max) throw new Error(`Cannot exceed maximum count of ${max}.`);
    this.appState.updateState(key, newCount);
    return newCount === max;
  }

  removeCount(key, min, max) {
    const currentCount = this.appState.getState(key);

    if (currentCount === min) throw new Error(`Cannot go below minimum count of ${min}.`);
    this.appState.updateState(key, currentCount - 1);
    return currentCount === max;
  }

  updateIngredientsCount = incrementBy => this.updateCount(`uploadRecipe.ingredientsCount`, incrementBy, MAX_INGREDIENTS_COUNT);

  removeIngredient = () => this.removeCount(`uploadRecipe.ingredientsCount`, MIN_INGREDIENTS_COUNT, MAX_INGREDIENTS_COUNT);

  updateStepsCount = incrementBy => this.updateCount(`uploadRecipe.stepsCount`, incrementBy, MAX_STEPS_COUNT);

  removeStep = () => this.removeCount(`uploadRecipe.stepsCount`, MIN_STEPS_COUNT, MAX_STEPS_COUNT);

  createRecipe(data) {
    try {
      const ingredients = [];
      const recipe = { ...Object.fromEntries([...data]), source_url: `no-source` };

      for (const key in recipe) {
        if (key.startsWith(`ingredient`)) {
          const [_, index, field] = key.split(`-`);
          const ingredientIndex = parseInt(index, 10) - 1;

          if (!ingredients[ingredientIndex]) ingredients[ingredientIndex] = { description: ``, quantity: ``, unit: `` };

          if (field === `name`) ingredients[ingredientIndex].description = recipe[key];
          else if (field === `quantity`) ingredients[ingredientIndex].quantity = recipe[key];
          else if (field === `unit`) ingredients[ingredientIndex].unit = recipe[key];

          delete recipe[key];
        } else if (key.includes(`direction`)) {
          ingredients.push({ description: `**direction** ${recipe[key]}`, quantity: ``, unit: `` });
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
