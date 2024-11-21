import View from "./view";

export default class RecipeFormView extends View {
  constructor() {
    super();
  }

  onCloseForm(handler) {
    document.querySelector(`.overlay`).addEventListener(`click`, () => handler());
    document.querySelector(`.btn--close-modal`).addEventListener(`click`, () => handler());
  }

  overlayMarkup = () => `<div class="overlay"></div>`;

  formMarkup = () => `<div class="add-recipe-window">
      <button class="btn--close-modal">&times;</button>

      <h2 class="upload__title">Upload Recipe Form</h2>
      <form class="upload">
        <h3 class="upload__heading">Recipe data</h3>
        <section class="upload__column">
          <div class="upload__row">
          <label>Title</label>
          <input placeholder="Pizza" required name="title" type="text" />
          </div>
          <div class="upload__row">
          <label>Image URL</label>
          <input placeholder="Recipe image" required name="imageUrl" type="text" />
          </div>
          <div class="upload__row">
          <label>Publisher</label>
          <input placeholder="Gordon Ramsay" required name="publisher" type="text" />
          </div>
          <div class="upload__row">
          <label>Prep time</label>
          <input placeholder="60 (in minutes)" required name="cookingTime" type="number" />
          </div>
          <div class="upload__row">
          <label>Servings</label>
          <input placeholder="4" required name="servings" type="number" />
          </div>
        </section>

        <h3 class="upload__heading">Ingredients</h3>
        <section class="upload__column">
        <label>Ingredient 1</label>
        <div class="upload__row">
          <input type="text" name="ingredient-1-quantity" placeholder="Quantity (Optional)" />
          <input type="text" name="ingredient-1-unit" placeholder="Unit (Optional)" />
          <input type="text" required name="ingredient-1-name" placeholder="Ingredient Name" />
          </div>
        <div class="add-btn slim">
          <svg>
            <use href="${this.icons}#icon-plus-circle" ></use>
          </svg>
          <p>Add Ingredient</p>
        </div>
        </section>
      </form>
      <button class="btn upload__btn">
          <svg>
            <use href="${this.icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
    </div>`;

  renderForm() {
    this.render(document.body, this.formMarkup(), `beforeEnd`);
    this.render(document.body, this.overlayMarkup(), `beforeEnd`);
  }

  removeForm() {
    this.remove(document.body, `.add-recipe-window`);
    this.remove(document.body, `.overlay`);
  }
}
