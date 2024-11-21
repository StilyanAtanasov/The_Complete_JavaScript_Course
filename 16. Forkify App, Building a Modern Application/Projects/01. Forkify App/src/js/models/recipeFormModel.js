import Model from "./model";

export default class RecipeFormModel extends Model {
  constructor(appState) {
    super(appState);
  }

  async createRecipe() {
    const response = await fetch(`/api/publishRecipe`);
    if (!response.ok) throw new Error(`Failed to fetch recipe`);
    const data = await response.json();
    console.log(data);
    return data;
  }
}
