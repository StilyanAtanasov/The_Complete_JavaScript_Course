import View from "./view";

export default class RecipeFormView extends View {
  constructor() {
    super();
  }

  onCloseForm(handler) {
    document.querySelector(`.overlay`).addEventListener(`click`, () => handler());
    document.querySelector(`.btn--close-modal`).addEventListener(`click`, () => handler());
  }

  onSubmit = handler =>
    document.querySelector(`.upload__btn`).addEventListener(`click`, function (e) {
      const target = e.target.closest(`.upload__btn`);
      if (!target) return;

      if (!document.querySelector(`.upload`).reportValidity()) return;

      handler(new FormData(document.querySelector(`.upload`)));
    });

  onAddIngredient = handler =>
    document.querySelector(`#add-ingredient-btn`).addEventListener(`click`, function (e) {
      const target = e.target.closest(`#add-ingredient-btn`);
      if (!target) return;
      handler();
    });

  overlayMarkup = () => `<div class="overlay"></div>`;

  ingredientMarkup = number => `<label>Ingredient ${number}</label>
          <div class="upload__row">
          <input type="text" name="ingredient-${number}-quantity" placeholder="Quantity (Optional)" maxlength="8"/>
          <input type="text" name="ingredient-${number}-unit" placeholder="Unit (Optional)" maxlength="10" />
          <input type="text" required name="ingredient-${number}-name" placeholder="Ingredient Name" minlength="2"  maxlength="120" />
          </div>`;

  formMarkup = () => `<div class="add-recipe-window">
      <button class="btn--close-modal">&times;</button>

      <h2 class="upload__title">Upload Recipe Form</h2>
      <form class="upload">
        <h3 class="upload__heading">Recipe data</h3>
        <section class="upload__column">
          <div class="upload__row">
          <label>Title</label>
          <input placeholder="Pizza" required name="title" type="text" minlength="3"  maxlength="50"/>
          </div>
          <div class="upload__row">
          <label>Image URL</label>
          <input placeholder="Recipe image" name="image_url" type="text" />
          </div>
          <div class="upload__row">
          <label>Publisher</label>
          <input placeholder="Gordon Ramsay" required name="publisher" type="text" minlength="3"  maxlength="30"/>
          </div>
          <div class="upload__row">
          <label>Prep time</label>
          <input placeholder="60 (in minutes)" required name="cooking_time" type="number" min="1" max="999"/>
          </div>
          <div class="upload__row">
          <label>Servings</label>
          <input placeholder="4" required name="servings" type="number" min="1" max="999"/>
          </div>
        </section>

        <h3 class="upload__heading">Ingredients</h3>
        <section class="upload__column">
        ${this.ingredientMarkup(1)}
        <div id="add-ingredient-btn" class="add-btn slim">
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

  addIngredient = number => this.render(document.querySelector(`#add-ingredient-btn`), this.ingredientMarkup(number), `beforeBegin`);

  renderForm() {
    this.render(document.body, this.formMarkup(), `beforeEnd`);
    this.render(document.body, this.overlayMarkup(), `beforeEnd`);
  }

  removeForm() {
    this.remove(document.body, `.add-recipe-window`);
    this.remove(document.body, `.overlay`);
  }
}
