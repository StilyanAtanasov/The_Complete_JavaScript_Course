import ResultsView from "./resultsView";

export default class CommunityRecipesView extends ResultsView {
  constructor() {
    super();
  }

  updateTitle = () => this.updateText(this.UIEls.results.title, `Community Recipes`);
}
