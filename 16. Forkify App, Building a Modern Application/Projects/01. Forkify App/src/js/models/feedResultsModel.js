import ResultsModel from "./resultsModel";
import { FEED_MAX_RESULTS, FEED_MAX_TOPICS } from "../config/config";
import { popularQueries, getRandomIndex, shuffleArray, timeout } from "../utils/utils";

export default class FeedResultsModel extends ResultsModel {
  constructor(appState) {
    super(appState);
  }

  syncLocalStorage = feed => window.localStorage.setItem(`feed`, JSON.stringify(feed));
  getStoredFeed = () => this.appState.updateState(`feed`, JSON.parse(window.localStorage.getItem(`feed`) || []));

  updateFeed(feed) {
    if (!feed) return;

    this.appState.updateState(`feed`, feed);
    this.syncLocalStorage(feed);
  }

  async generateFeed() {
    try {
      const queries = [];
      for (let i = 0; i < FEED_MAX_TOPICS; i++) {
        const query = popularQueries[getRandomIndex(popularQueries.length)];

        if (!queries.includes(query)) {
          queries.push(query);
          continue;
        } else {
          for (let j = 1; j <= i + 1; j++) {
            const newQuery = popularQueries[i + j];
            if (!queries.includes(query)) {
              queries.push(newQuery);
              break;
            }
          }
        }
      }

      const response = await Promise.allSettled(
        queries.map(q =>
          Promise.race([
            fetch(`.netlify/functions/searchRecipes`, {
              method: `POST`,
              headers: {
                "Content-Type": `application/json`,
              },
              body: JSON.stringify({ searchQuery: q }),
            }).then(res => res.json()),
            timeout(5000, `Search request took too long!`),
          ])
        )
      );

      const recipes = response.filter(result => result.status === "fulfilled" && result.value?.data?.data?.recipes).flatMap(result => result.value.data.data.recipes);
      const randomised = shuffleArray(recipes).slice(0, FEED_MAX_RESULTS);
      const totalPages = Number.parseInt(randomised.length / this.appState.getState(`search.resultsPerPage`)) + 1;

      this.appState.updateState(`search.response`, randomised);
      this.appState.updateState(`search.currentPage`, 1);
      this.appState.updateState(`search.totalPages`, totalPages);

      this.updateFeed(randomised);

      return randomised;
    } catch {
      throw new Error(`Error getting feed!`);
    }
  }
}
