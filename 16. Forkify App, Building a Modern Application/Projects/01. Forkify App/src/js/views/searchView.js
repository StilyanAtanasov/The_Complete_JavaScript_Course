import View from "./view";

export default class SearchView extends View {
  constructor() {
    super();
  }

  getSearchPrompt = () => this.UIEls.searchForm.searchField.value.trim();

  clearInputField = () => (this.UIEls.searchForm.searchField.value = ``);

  onSearch = handler =>
    this.UIEls.searchForm.searchBtn.addEventListener(`click`, function (e) {
      e.preventDefault();
      handler();
    });

  updateTitle = () => this.updateText(this.UIEls.results.title, `Searching...`);
  showSpinner = () => this.renderSpinner(this.UIEls.results.title);
}
