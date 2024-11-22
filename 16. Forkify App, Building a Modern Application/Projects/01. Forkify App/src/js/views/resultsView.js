import View from "./view";

export default class ResultsView extends View {
  static location = document.querySelector(`.search__results`);
  static #paginationClickCallback;

  constructor() {
    super(ResultsView.location);
  }

  showSpinner = () => this.renderSpinner(this.UIEls.results.title);
  hideSpinner = () => this.remove(this.UIEls.results.container, `.spinner`);

  previewMarkup = (id, imgUrl, title, publisher, custom = false) => `<a class="preview__link" href="#${id}">
              <figure class="preview__fig">
                <img src="${imgUrl}" alt="${title} img" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${title}</h4>
                <p class="preview__publisher">${publisher}</p>
                ${
                  custom
                    ? `<div class="preview__user-generated">
                  <svg>
                    <use href="${this.icons}#icon-check" />
                  </svg>
                </div>`
                    : ``
                }
              </div>
            </a>
          `;

  paginationBtnMarkup(direction, incrementBy) {
    const arrowIcon = `
            <svg class="search__icon">
              <use href="${this.icons}#icon-arrow-${direction}"></use>
            </svg>`;

    return `<button class="btn--inline pagination__btn pagination__btn--${direction === `left` ? `prev` : `next`}" data-increment="${incrementBy}">
              ${direction === `left` ? `${arrowIcon} <span>Previous</span>` : `<span>Next</span> ${arrowIcon} `}
            </button>`;
  }

  currentPageMarkup = (currentPage, totalPages) => `<span class="current-page">Page ${currentPage}/${totalPages}</span>`;

  renderResults(results, start, end) {
    for (let i = start; i <= end; i++) {
      const result = results[i];
      let custom = false;

      if (result.title.includes(`**custom**`)) {
        custom === true;
        result.title = result.title.replaceAll(`**custom**`, ``); // Potential BUG
      }

      this.render(this.UIEls.results.resultsList, this.previewMarkup(result.id, result.image_url, result.title, result.publisher, custom), `beforeend`);
    }
  }

  renderPagination(currentPage, totalPages) {
    this.UIEls.results.paginationContainer.innerHTML = ``;

    const renderInPaginationContainer = markup => this.render(this.UIEls.results.paginationContainer, markup, `beforeEnd`);
    if (currentPage > 1) renderInPaginationContainer(this.paginationBtnMarkup(`left`, -1));
    renderInPaginationContainer(this.currentPageMarkup(currentPage, totalPages));
    if (currentPage < totalPages) renderInPaginationContainer(this.paginationBtnMarkup(`right`, 1));
  }

  onPaginationClick(handler) {
    ResultsView.#paginationClickCallback = function (e) {
      const target = e.target.closest(`.pagination__btn`);
      if (!target) return;
      handler(parseInt(target.dataset.increment, 10));
    };

    this.UIEls.results.paginationContainer.addEventListener(`click`, ResultsView.#paginationClickCallback);
  }

  removeCurrentResults() {
    this.UIEls.results.resultsList.innerHTML = this.UIEls.results.paginationContainer.innerHTML = ``;
    this.remove(this.UIEls.results.container, `.add-btn`);
  }

  removePaginationClickListener = () => this.UIEls.results.paginationContainer.removeEventListener(`click`, ResultsView.#paginationClickCallback);
}
