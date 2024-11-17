import ResultsView from "./resultsView";

export default class BookmarksView extends ResultsView {
  constructor() {
    super();
  }

  updateTitle = () => this.updateText(this.UIEls.results.title, `Bookmarks`);
}
