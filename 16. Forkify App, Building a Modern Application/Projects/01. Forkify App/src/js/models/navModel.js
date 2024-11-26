import Model from "./model";

export default class NavModel extends Model {
  constructor(appState) {
    super(appState);
  }

  updateCurrentPage = page => this.appState.updateState(`currentPage`, page);
}
