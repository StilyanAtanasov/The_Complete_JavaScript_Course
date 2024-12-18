import ResultsModel from "./resultsModel";
import { FEED_MAX_RESULTS, COMMUNITY_MAX_TOPICS, COMMUNITY_UPDATE_MILLISECONDS } from "../config/config";
import { popularQueries, shuffleArray, getRadomQueries, requestMultipleQueries } from "../utils/utils";

export default class CommunityRecipesModel extends ResultsModel {
  constructor(appState) {
    super(appState);
  }

  syncLocalStorage = communityData => window.localStorage.setItem(`community`, JSON.stringify(communityData));
  getStoredFeed = () => this.appState.updateState(`community`, JSON.parse(window.localStorage.getItem(`community`)));

  updateFeed(communityData) {
    if (!communityData) return;

    this.appState.updateState(`community`, communityData);
    this.syncLocalStorage(communityData);
  }

  chackValidFeed = communityData => (communityData && Date.now() - communityData.ellapsedMilliseconds < COMMUNITY_UPDATE_MILLISECONDS ? true : false);

  async generateCommunityFeed() {
    try {
      const response = await requestMultipleQueries(getRadomQueries(COMMUNITY_MAX_TOPICS, popularQueries));

      const recipes = response
        .filter(result => result.status === `fulfilled` && result.value?.data)
        .flatMap(result => result.value.data)
        .filter(r => !r.verified);
      const randomised = shuffleArray(recipes).slice(0, FEED_MAX_RESULTS);

      const communityData = {
        ellapsedMilliseconds: Date.now(),
        results: randomised,
      };

      this.updateFeed(communityData);

      return randomised;
    } catch (err) {
      console.log(err);
      throw new Error(`Error getting feed!`);
    }
  }
}
