import ResultsModel from "./resultsModel";

export default class SearchResultsModel extends ResultsModel {
  constructor(appState) {
    super(appState);
  }

  #sortFunctions = [
    { name: `Custom Recipes First`, func: this.#sortRecipesCustomFirst },
    { name: `Verified Recipes First`, func: this.#sortRecipesVerifiedFirst },
  ];

  changeResultsPage = () => this.appState.updateState(`currentPage`, `searchResults`);

  getSortFunction(index) {
    const newIndex = index % this.#sortFunctions.length;

    this.appState.updateState(`results.currentSort`, newIndex);
    return this.#sortFunctions[newIndex];
  }

  #sortRecipesVerifiedFirst(recipes) {
    return recipes.sort((a, b) => {
      if (a.verified === b.verified) return 0;
      return a.verified ? -1 : 1;
    });
  }

  #sortRecipesCustomFirst(recipes) {
    return recipes.sort((a, b) => {
      if (a.verified === b.verified) return 0;
      return a.verified ? 1 : -1;
    });
  }
}
