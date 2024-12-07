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

      console.log(new FormData(document.querySelector(`.upload`)));
      if (!document.querySelector(`.upload`).reportValidity()) return;
      handler(new FormData(document.querySelector(`.upload`)));
    });

  onAddIngredient = handler =>
    document.querySelector(`#add-ingredient-btn`).addEventListener(`click`, function (e) {
      const target = e.target.closest(`#add-ingredient-btn`);
      if (!target) return;
      handler();
    });

  onRemoveIngredient = handler =>
    document.querySelector(`#upload__ingredients`).addEventListener(`click`, function (e) {
      e.preventDefault();
      const target = e.target;
      if (!target.classList.contains(`btn--remove-ingredient`)) return;
      const ingredientEl = target.closest(`.upload__ingredient`);
      if (!ingredientEl) return;

      handler(ingredientEl);
    });

  onAddStep = handler =>
    document.querySelector(`#add-step-btn`).addEventListener(`click`, function (e) {
      const target = e.target.closest(`#add-step-btn`);
      if (!target) return;
      handler();
    });

  onRemoveStep = handler =>
    document.querySelector(`#upload__steps`).addEventListener(`click`, function (e) {
      e.preventDefault();
      const target = e.target;
      if (!target.classList.contains(`btn--remove-step`)) return;
      const ingredientEl = target.closest(`.upload__step`);
      if (!ingredientEl) return;

      handler(ingredientEl);
    });

  addBtnMarkup = (id, text) => `
        <div id="${id}" class="add-btn slim">
          <svg>
            <use href="${this.icons}#icon-plus-circle" ></use>
          </svg>
          <p>${text}</p>
        </div>`;

  directionMarkup = number => `
            <div class="upload__step">
              <label>Step ${number}</label>
              <div class="upload__row">
                <button class="btn--remove btn--remove-step">&times;</button>
                <textarea name="direction-${number}" class="cooking__direction" placeholder=" Write recipe direction here." required maxlength="500"></textarea>
              </div>
            </div>`;

  ingredientMarkup = number => `
          <div class="upload__ingredient">
            <label>Ingredient ${number}</label>
            <div class="upload__row">
            <button class="btn--remove btn--remove-ingredient">&times;</button>
              <input type="text" name="ingredient-${number}-quantity" placeholder="Quantity (Optional)" maxlength="8"/>
              <input type="text" name="ingredient-${number}-unit" placeholder="Unit (Optional)" maxlength="10" />
              <input type="text" required name="ingredient-${number}-name" placeholder="Ingredient Name" minlength="2"  maxlength="120" />
            </div>
          </div>`;

  formMarkup = () => `<div class="add-recipe-window">
      <button class="btn--remove btn--close-modal">&times;</button>

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
        <section id="upload__ingredients" class="upload__column">
        ${this.ingredientMarkup(1)}
        ${this.addBtnMarkup(`add-ingredient-btn`, `Add Ingredient`)}
        </section>

        <h3 class="upload__heading">Directions</h3>
        <section  id="upload__steps" class="upload__column">
        ${this.directionMarkup(1)}
        ${this.addBtnMarkup(`add-step-btn`, `Add Step`)}
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

  addStep = number => this.render(document.querySelector(`#add-step-btn`), this.directionMarkup(number), `beforeBegin`);

  removeIngredient = target => document.querySelector(`#upload__ingredients`).removeChild(target);

  removeStep = target => document.querySelector(`#upload__steps`).removeChild(target);

  toggleAddIngredientsBtn = force => document.querySelector(`#add-ingredient-btn`).classList.toggle(`hidden`, force);

  toggleAddStepsBtn = force => document.querySelector(`#add-steps-btn`).classList.toggle(`hidden`, force);

  shiftIngredientsIndexes() {
    const ingredients = document.querySelectorAll(`.upload__ingredient`);
    ingredients.forEach((ingredient, index) => {
      const newIndex = index + 1;
      ingredient.querySelector(`label`).textContent = `Ingredient ${newIndex}`;

      const inputs = ingredient.querySelectorAll(`input`);
      inputs.forEach(input => {
        const nameParts = input.name.split(`-`);
        const field = nameParts[nameParts.length - 1];
        input.name = `ingredient-${newIndex}-${field}`;
      });
    });
  }

  shiftStepsIndexes() {
    const steps = document.querySelectorAll(`.upload__step`);
    steps.forEach((step, index) => {
      const newIndex = index + 1;
      step.querySelector(`label`).textContent = `Ingredient ${newIndex}`;

      const textarea = step.querySelector(`textarea`);
      textarea.name = `direction-${newIndex}`;
    });
  }

  renderForm() {
    this.renderOverlay();
    this.render(document.body, this.formMarkup(), `beforeEnd`);
  }

  removeForm() {
    this.remove(document.body, `.add-recipe-window`);
    this.removeOverlay();
  }
}
