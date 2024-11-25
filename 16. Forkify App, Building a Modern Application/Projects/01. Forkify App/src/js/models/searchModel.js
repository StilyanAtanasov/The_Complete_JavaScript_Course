import { timeout } from "../utils/utils";
import Model from "./model";

export default class SearchModel extends Model {
  constructor(appState) {
    super(appState);
  }

  async searchRecipe(searchPrompt) {
    try {
      const response = await Promise.race([
        fetch(`.netlify/functions/searchRecipes`, {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify({
            searchQuery: searchPrompt,
          }),
        }),
        timeout(5000, `Search request took too long!`), // BUG
      ]);

      if (!response.ok) throw new Error(`Error fetching results: ${(await response.json()).message}`);

      const data = await response.json();
      if (!data) throw new Error();

      const recipes = data.data.recipes;
      if (recipes.length === 0) return null;

      const totalPages = Number.parseInt(recipes.length / this.appState.getState(`search.resultsPerPage`)) + 1;

      this.appState.updateState(`search.query`, searchPrompt);
      this.appState.updateState(`search.response`, recipes);
      this.appState.updateState(`search.currentPage`, 1);
      this.appState.updateState(`search.totalPages`, totalPages);

      return response;
    } catch {
      throw new Error(`Error searching for: ${searchPrompt}! Please, try again later!`);
    }
  }
}
