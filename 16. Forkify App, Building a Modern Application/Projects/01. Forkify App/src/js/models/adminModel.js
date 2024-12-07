import { timeout } from "../utils/utils";
import Model from "./model";

export default class AdminModel extends Model {
  constructor(appState) {
    super(appState);
  }

  async validateCredentials(password) {
    try {
      const response = await Promise.race([
        fetch(`.netlify/functions/validateCredentials`, {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify({ password }),
        }),
        timeout(5000, `Verification took too long!`),
      ]);

      if (!response.ok) throw new Error();
      const data = await response.json();
      return data.valid;
    } catch (err) {
      throw new Error(`Error validating credentials!`);
    }
  }

  async deleteRecipe(id) {
    try {
      const response = await Promise.race([
        fetch(`.netlify/functions/deleteRecipe`, {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify({ id }),
        }),
        timeout(5000, `Delete request took too long!`),
      ]);

      // if (!response.ok) throw new Error();
      const data = await response.json();
      console.log(data);

      return data.message;
    } catch {
      throw new Error(`Error deleting recipe!`);
    }
  }

  assureCustom = recipe => !recipe.verified;

  #prepareRecipe(recipeInput) {
    const recipe = structuredClone(recipeInput);
    recipe.title += `**verified**`;

    recipe.cooking_time = recipe.cookingTime;
    recipe.image_url = recipe.imageUrl;
    recipe.source_url = recipe.sourceUrl;

    recipe.directions &&
      recipe.directions.forEach(d => {
        recipe.ingredients.push({ description: `**direction** ${d}` });
      });

    delete recipe.directions;

    return recipe;
  }

  async verifyRecipe(recipe) {
    try {
      const newRecipe = this.#prepareRecipe(recipe);
      const response = await Promise.race([
        fetch(`.netlify/functions/publishRecipe`, {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify(newRecipe),
        }),
        timeout(5000),
      ]);

      if (!response.ok) throw new Error();
      const data = await response.json();

      return data ? `Recipe verified successfully` : `Error verifying recipe!`;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
