import ResultsView from "./resultsView";

export default class SearchResultsView extends ResultsView {
  constructor() {
    super();
  }

  updateTitle = searchPrompt => this.updateText(this.UIEls.results.title, `Results for: ${searchPrompt}`);
}
