import View from "./view";

export default class SearchView extends View {
  constructor() {
    super();
  }

  getSearchPrompt = () => this.UIEls.searchForm.searchField.value.trim();

  clearInputField = () => (this.UIEls.searchForm.searchField.value = ``);

  handleSearch = handler =>
    this.UIEls.searchForm.searchBtn.addEventListener(`click`, function (e) {
      e.preventDefault();
      handler();
    });
}
