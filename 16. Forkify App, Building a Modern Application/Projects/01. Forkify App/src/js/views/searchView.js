import View from "./view";

export default class searchView extends View {
  constructor() {
    super();
  }

  getSearchPrompt = () => this.UIEls.header.searchField.value.trim();

  handleSearch = handler => this.UIEls.header.searchBtn.addEventListener(`click`, handler);
}
