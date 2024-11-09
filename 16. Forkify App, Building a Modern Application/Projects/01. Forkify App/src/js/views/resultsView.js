import View from "./view";

export default class ResultsView extends View {
  constructor() {
    super();
  }

  updateTitle = searchPrompt => this.updateText(this.UIEls.results.title, `Results for ${searchPrompt}`);

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
}
