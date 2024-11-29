import ResultsModel from "./resultsModel";
import { FEED_MAX_RESULTS, FEED_MAX_TOPICS, FEED_UPDATE_MILLISECONDS } from "../config/config";
import { popularQueries, shuffleArray, getRadomQueries, requestMultipleQueries } from "../utils/utils";

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

  chackValidFeed(feedData) {
    if (!feedData) return false;
    return Date.now() - feedData.ellapsedMilliseconds < FEED_UPDATE_MILLISECONDS ? true : false;
  }

  async generateFeed() {
    try {
      const response = await requestMultipleQueries(getRadomQueries(FEED_MAX_TOPICS, popularQueries));

      const recipes = response.filter(result => result.status === "fulfilled" && result.value?.data).flatMap(result => result.value.data);
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
