import { API_URL } from "../config/config";
import { timeout } from "../utils/utils";
import Model from "./model";

export default class SearchModel extends Model {
  constructor(appState) {
    super(appState);
  }

  async searchRecipe(searchPrompt) {
    try {
      const response = await Promise.race([fetch(`${API_URL}?search=${searchPrompt}`), timeout(5000, `Search request took too long!`)]);
      if (!response.ok) throw new Error(`Error fetching results`);

      const data = await response.json();
      if (!data) throw new Error(`Error parsing response`);

      const recipes = data.data.recipes;
      recipes.length === 0 && console.log(`No recipes found!`); // TODO

      const totalPages = Number.parseInt(recipes.length / this.appState.getState(`search.resultsPerPage`)) + 1;

      this.appState.updateState(`search.query`, searchPrompt);
      this.appState.updateState(`search.response`, recipes);
      this.appState.updateState(`search.currentPage`, 1);
      this.appState.updateState(`search.totalPages`, totalPages);

      return response;
    } catch (err) {
      console.error(err.message); // TODO
    }
  }
}
