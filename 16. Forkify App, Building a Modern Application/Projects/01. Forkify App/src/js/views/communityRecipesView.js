import ResultsView from "./resultsView";

export default class CommunityRecipesView extends ResultsView {
  constructor() {
    super();
  }

  onUploadBtnClick = handler =>
    document.querySelector(`#upload-recipe-btn`).addEventListener(`click`, function (e) {
      const target = e.target.closest(`#upload-recipe-btn`);
      if (!target) return;

      handler();
    });

  uploadRecipeBtnMarkup = () => `<button id="upload-recipe-btn" class="add-btn">
          <svg>
            <use href="${this.icons}#icon-plus-circle" ></use>
          </svg>
          <p>Upload Recipe</p>
        </button>`;

  updateTitle = () => this.updateText(this.UIEls.results.title, `Community Recipes`);
  renderUploadRecipeBtn = () => this.render(this.UIEls.results.title, this.uploadRecipeBtnMarkup(), `afterEnd`);
}
