import ResultsView from "./resultsView";

export default class CommunityRecipesView extends ResultsView {
  constructor() {
    super();
  }

  onUploadBtnClick = handler =>
    document.querySelector(`.search__results--add-recipe`).addEventListener(`click`, function (e) {
      const target = e.target.closest(`.search__results--add-recipe`);
      if (!target) return;

      handler();
    });

  uploadRecipeBtnMarkup = () => `<div class="search__results--add-recipe">
          <svg>
            <use href="${this.icons}#icon-plus-circle" ></use>
          </svg>
          <p>Upload Recipe</p>
        </div>`;

  updateTitle = () => this.updateText(this.UIEls.results.title, `Community Recipes`);
  renderUploadRecipeBtn = () => this.render(this.UIEls.results.title, this.uploadRecipeBtnMarkup(), `afterEnd`);
}
