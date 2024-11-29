import { PROMPT_MIN_LENGTH, SEARCH_HISTORY_LENGTH } from "../config/config";
import FixedQueue from "../utils/fixedQueue";
import { timeout } from "../utils/utils";
import Model from "./model";

export default class SearchModel extends Model {
  constructor(appState) {
    super(appState);
  }

  validateSearchQuery(prompt) {
    if (!prompt || typeof prompt !== `string`) throw new Error(`Invalid search query!`);

    const formatted = prompt.toLowerCase();

    const minLength = PROMPT_MIN_LENGTH;
    const hasValidLength = formatted.length >= minLength;
    const isAlphanumeric = /^[a-zA-Z0-9\s]+$/.test(formatted);
    const noRepeatingChars = !/(.)\1{2,}/.test(formatted);
    const containsLetter = /[a-zA-Z]/.test(formatted);

    if (!hasValidLength) throw new Error(`Prompt must be at least ${minLength} characters long!`);
    if (!isAlphanumeric) throw new Error(`Prompt cannot contain special characters!`);
    if (!noRepeatingChars) throw new Error(`Prompt cannot contain consecutive repeating characters!`);
    if (!containsLetter) throw new Error(`Prompt must contain at least one letter!`);

    return formatted;
  }

  checkHistory(query) {
    const searchHistory = this.appState.getState(`searchHistory`).getQueue();

    const found = searchHistory.find(s => s.query === query);
    return found?.response || false;
  }

  syncLocalStorage = searchHistory => searchHistory && window.localStorage.setItem(`searchHistory`, JSON.stringify(searchHistory));
  initSearchHistory = () => this.appState.updateState(`searchHistory`, FixedQueue.from(JSON.parse(window.localStorage.getItem(`searchHistory`)), SEARCH_HISTORY_LENGTH));

  updateHistory(query, response) {
    if (!response) return;
    const newHistory = this.appState.getState(`searchHistory`).enqueue({ query, response });
    this.syncLocalStorage(newHistory.getQueue());
  }

  async searchRecipe(searchPrompt) {
    try {
      const response = await Promise.race([
        fetch(`.netlify/functions/searchRecipes`, {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify({ searchQuery: searchPrompt }),
        }),
        timeout(5000, `Search request took too long!`),
      ]);

      if (!response.ok) throw new Error(`Error fetching results: ${(await response.json()).message}`);

      const data = await response.json();
      if (!data) throw new Error();

      const recipes = data.data;

      if (recipes.length === 0) return null; // FIX

      this.updateHistory(searchPrompt, recipes);

      return recipes;
    } catch (err) {
      console.error(err.message);
      throw new Error(`Error searching for: ${searchPrompt}! Please, try again later!`);
    }
  }
}
