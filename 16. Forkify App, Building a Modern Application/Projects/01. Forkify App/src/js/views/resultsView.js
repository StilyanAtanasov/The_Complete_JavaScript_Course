import View from "./view";

export default class ResultsView extends View {
  #paginationClickCallback;

  constructor() {
    super();
  }

  hideSpinner = () => this.remove(this.UIEls.results.container, `.spinner`);

  previewMarkup = (id, imgUrl, title, publisher) => `<a class="preview__link preview__link--active" href="#${id}">
              <figure class="preview__fig">
                <img src="${imgUrl}" alt="${title} img" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${title}</h4>
                <p class="preview__publisher">${publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${this.icons}#icon-user" />
                  </svg>
                </div>
              </div>
            </a>
          `;

  paginationBtnMarkup(pageNum, direction, incrementBy) {
    const arrowIcon = `
            <svg class="search__icon">
              <use href="${this.icons}#icon-arrow-${direction}"></use>
            </svg>`;

    return `<button class="btn--inline pagination__btn pagination__btn--${direction === `left` ? `prev` : `next`}" data-increment="${incrementBy}">
              ${direction === `left` ? arrowIcon : ``}
              <span>Page ${pageNum}</span>
              ${direction === `right` ? arrowIcon : ``}
            </button>`;
  }

  renderResults(results, start, end) {
    this.UIEls.results.resultsList.innerHTML = ``;

    for (let i = start; i <= end; i++) {
      const result = results[i];
      this.render(this.UIEls.results.resultsList, this.previewMarkup(result.id, result.image_url, result.title, result.publisher), `beforeend`);
    }
  }

  renderPagination(currentPage, totalPages) {
    this.UIEls.results.paginationContainer.innerHTML = ``;

    const renderPageButton = (pageNum, direction, incrementBy) => this.render(this.UIEls.results.paginationContainer, this.paginationBtnMarkup(pageNum, direction, incrementBy), `beforeEnd`);
    if (currentPage > 1) renderPageButton(currentPage - 1, `left`, -1);
    if (currentPage < totalPages) renderPageButton(currentPage + 1, `right`, 1);
  }

  onPaginationClick(handler) {
    this.#paginationClickCallback = function (e) {
      const target = e.target.closest(`.pagination__btn`);
      if (!target) return;
      handler(parseInt(target.dataset.increment, 10));
    };

    this.UIEls.results.paginationContainer.addEventListener(`click`, this.#paginationClickCallback);
  }

  removePaginationClickListener = () => this.UIEls.results.paginationContainer.removeEventListener(`click`, this.#paginationClickCallback);
}
