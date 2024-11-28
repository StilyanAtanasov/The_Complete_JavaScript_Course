import { PAGE_RESULTS_LIMIT, RECIPE_HISTORY_LENGTH, SEARCH_HISTORY_LENGTH } from "./config/config";
import FixedQueue from "./utils/fixedQueue";

export default class AppState {
  #appState;
  constructor() {
    this.#appState = {
      search: {
        query: ``,
        currentPage: 0,
        totalPages: 0,
        resultsPerPage: PAGE_RESULTS_LIMIT, // TODO
        response: [],
      },
      currentRecipe: {
        id: ``,
        title: ``,
        imageUrl: ``,
        publisher: ``,
        cookingTime: 0,
        ingredients: [],
        servings: 0,
        sourceUrl: ``,
      },
      uploadRecipe: {
        ingredientsCount: 1,
      },
      popularRecipes: [`63b`], //`417`, `49d`, `45a`, `4b5`, `96b`, `917`, `827`, `30f`, `a73`, `627`, `3dc`, `951`, `62d`, `aab`
      bookmarks: [],
      shoppingList: [],
      currentPage: `PopularResults`,
      recipeHistory: new FixedQueue(RECIPE_HISTORY_LENGTH),
      searchHistory: new FixedQueue(SEARCH_HISTORY_LENGTH),
    };
  }

  updateState(keyPath, newValue) {
    const keys = keyPath.split(`.`);
    let obj = this.#appState;

    for (let i = 0; i < keys.length - 1; i++) if (keys[i] in obj) obj = obj[keys[i]];

    const lastKey = keys.at(-1);
    obj[lastKey] = newValue;
  }

  getState = keyPath => keyPath.split(`.`).reduce((acc, key) => (acc === undefined || acc[key] === undefined ? undefined : acc[key]), this.#appState);
}
