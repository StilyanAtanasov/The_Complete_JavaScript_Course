import ResultsModel from "./resultsModel";
import { FEED_MAX_RESULTS, FEED_MAX_TOPICS, FEED_UPDATE_MILLISECONDS } from "../config/config";
import { popularQueries, getRandomIndex, shuffleArray, timeout } from "../utils/utils";

export default class FeedResultsModel extends ResultsModel {
  constructor(appState) {
    super(appState);
  }

  syncLocalStorage = feedData => window.localStorage.setItem(`feed`, JSON.stringify(feedData));
  getStoredFeed = () => this.appState.updateState(`feed`, JSON.parse(window.localStorage.getItem(`feed`)));

  updateFeed(feedData) {
    if (!feedData) return;

    this.appState.updateState(`feed`, feedData);
    this.syncLocalStorage(feedData);
  }

  chackValidFeed = feedData => (Date.now() - feedData.ellapsedMilliseconds < FEED_UPDATE_MILLISECONDS ? true : false);

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

      const feedData = {
        ellapsedMilliseconds: Date.now(),
        results: randomised,
      };

      this.updateFeed(feedData);

      return randomised;
    } catch {
      throw new Error(`Error getting feed!`);
    }
  }
}
