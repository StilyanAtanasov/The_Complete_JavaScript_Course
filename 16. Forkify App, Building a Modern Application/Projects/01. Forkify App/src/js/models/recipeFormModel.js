import Model from "./model";

export default class RecipeFormModel extends Model {
  constructor(appState) {
    super(appState);
  }

  async createRecipe() {
    try {
      const response = await fetch(`.netlify/functions/publishRecipe`, {
        method: `POST`,
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify({
          title: `ld`,
        }),
      });

      if (!response.ok) throw new Error(`Failed to fetch recipe: ${response.statusText ?? ``}`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err.message); // TODO
    }
  }
}
