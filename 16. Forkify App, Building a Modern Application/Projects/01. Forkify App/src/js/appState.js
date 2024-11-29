import { RECIPE_HISTORY_LENGTH, SEARCH_HISTORY_LENGTH } from "./config/config";
import FixedQueue from "./utils/fixedQueue";

export default class AppState {
  #appState;
  constructor() {
    this.#appState = {
      currentRecipe: {
        id: ``,
        title: ``,
        imageUrl: ``,
        publisher: ``,
        cookingTime: 0,
        ingredients: [],
        servings: 0,
        sourceUrl: ``,
        custom: false,
      },
      uploadRecipe: {
        ingredientsCount: 1,
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
