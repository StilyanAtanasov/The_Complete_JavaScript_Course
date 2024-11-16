import ResultsView from "./resultsView";

export default class PopularResultsView extends ResultsView {
  constructor() {
    super();
  }

  updateTitle = () => this.updateText(this.UIEls.results.title, `Popular Recipes`);
}
