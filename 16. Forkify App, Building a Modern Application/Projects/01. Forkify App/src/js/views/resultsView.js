import View from "./view";

export default class ResultsView extends View {
  constructor() {
    super();
  }

  updateTitle = searchPrompt => this.updateText(this.UIEls.results.title, `Results for: ${searchPrompt}`);
  hideSpinner = () => this.remove(this.UIEls.results.container, `.spinner`);

  buildMarkup = (id, imgUrl, title, publisher) => `<a class="preview__link preview__link--active" href="#${id}">
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

  renderResults(results, start, end) {
    this.UIEls.results.resultsList.innerHTML = ``;

    for (let i = start; i <= end; i++) {
      const result = results[i];
      this.render(this.UIEls.results.resultsList, this.buildMarkup(result.id, result.image_url, result.title, result.publisher), `beforeend`);
    }
  }
}
