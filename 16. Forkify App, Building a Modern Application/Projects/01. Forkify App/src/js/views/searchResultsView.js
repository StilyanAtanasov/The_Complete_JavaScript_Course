import ResultsView from "./resultsView";

export default class SearchResultsView extends ResultsView {
  constructor() {
    super();
  }

  updateTitle = searchPrompt => this.updateText(this.UIEls.results.title, `Results for: ${searchPrompt}`);

  onSortClick = handler => document.querySelector(`.sort-results--box`).addEventListener(`click`, () => handler());

  #sortBtnMarkup = () => `
          <div class="sort-results--box">
            <svg>
              <use href="${this.icons}#icon-sort"></use>
            </svg>
            <button>SORT: </button>
            <span>Verified Recipes First</span>
          </div>`;

  displaySortBtn = () => this.render(this.UIEls.results.resultsList, this.#sortBtnMarkup(), `beforeBegin`);

  changeSortButtonText = text => (document.querySelector(`.sort-results--box span`).textContent = text);

  removeCurrentPreviews = () => (this.UIEls.results.resultsList.innerHTML = this.UIEls.results.paginationContainer.innerHTML = ``);
}
