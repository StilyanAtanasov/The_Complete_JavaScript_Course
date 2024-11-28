import ResultsView from "./resultsView";

export default class FeedResultsView extends ResultsView {
  constructor() {
    super();
  }

  updateTitle = () => this.updateText(this.UIEls.results.title, `Feed`);
}
