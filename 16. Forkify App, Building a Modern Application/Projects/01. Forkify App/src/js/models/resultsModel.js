import Model from "./model";

export default class ResultsModel extends Model {
  constructor(appState) {
    super(appState);
  }

  updateResultsPage = incrementBy => this.appState.updateState(`search.currentPage`, this.appState.getState(`search.currentPage`) + incrementBy);
}
