import { RECIPE_HISTORY_LENGTH, SEARCH_HISTORY_LENGTH, DEFAULT_SORT_FUNCTION } from "./config/config";
import FixedQueue from "./utils/fixedQueue";

export default class AppState {
  #appState;
  constructor() {
    this.#appState = {
      results: {
        currentSort: DEFAULT_SORT_FUNCTION,
      },
      currentRecipe: {
        id: ``,
        title: ``,
        ingredients: [],
        servings: 0,
      },
      uploadRecipe: {
        ingredientsCount: 1,
        stepsCount: 1,
      },
      feed: {},
      community: {},
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
