import { PAGE_RESULTS_LIMIT } from "./config/config";

export default class AppState {
  #appState;
  constructor() {
    this.#appState = {
      search: {
        query: ``,
        currentPage: 0,
        totalPages: 0,
        resultsPerPage: PAGE_RESULTS_LIMIT,
        response: [],
      },
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
