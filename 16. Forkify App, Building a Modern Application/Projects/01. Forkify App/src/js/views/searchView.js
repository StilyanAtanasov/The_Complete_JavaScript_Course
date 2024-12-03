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

  updateTitle = title => title && this.updateText(this.UIEls.results.title, title);
  hideSpinner = () => this.remove(this.UIEls.results.container, `.spinner`);

  showSpinner = () => this.renderSpinner(this.UIEls.results.title);
  removeCurrentResults() {
    this.UIEls.results.resultsList.innerHTML = this.UIEls.results.paginationContainer.innerHTML = ``;
    this.remove(this.UIEls.results.container, `.add-btn`);
    this.remove(this.UIEls.results.container, `.sort-results--box`);
  }
}
