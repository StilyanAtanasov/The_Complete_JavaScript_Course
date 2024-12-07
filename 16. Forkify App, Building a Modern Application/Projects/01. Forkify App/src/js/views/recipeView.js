import View from "./view";
import { formatFraction } from "../utils/utils";

export default class RecipeView extends View {
  static location = document.querySelector(`.recipe`);

  constructor() {
    super(RecipeView.location);
  }

  showSpinner = () => this.renderSpinner(this.UIEls.recipe.container, `afterBegin`, true);
  removeSpinner = () => window.innerWidth <= 800 && this.remove(document.querySelector(`.container`), `.spinner.global`);

  onBookmark = handler =>
    document.querySelector(`.bookmark-btn`).addEventListener(
      `click`,
      function (e) {
        const target = e.target.closest(`.bookmark-btn`);
        if (!target) return;

        this.toggleBookmarkIcon();
        handler();
      }.bind(this)
    );

  onUpdateServings = handler =>
    document.querySelector(`.recipe__info-buttons`).addEventListener(`click`, function (e) {
      const target = e.target.closest(`.btn--increase-servings`);
      if (!target) return;

      handler(Number.parseInt(target.dataset.update_by, 10));
    });

  onAddAllProducts = handler => document.querySelector(`.add-all-products-btn`).addEventListener(`click`, () => handler());

  onAddProduct = handler =>
    document.querySelector(`.recipe__ingredients`).addEventListener(`click`, function (e) {
      const target = e.target.closest(`.recipe__ingredient`);
      if (!target) return;

      const quantity = target.querySelector(`.recipe__ingredient--quantity`).textContent.trim() || ``;
      const unit = target.querySelector(`.recipe__ingredient--unit`).textContent.trim() || ``;
      const description = target.querySelector(`.recipe__ingredient--name`).textContent.trim();

      handler(quantity, unit, description);
    });

  onReturnBack = handler => document.querySelector(`.return-back-btn`).addEventListener(`click`, () => handler());

  ingredientMarkup = (ingredient, quantity, unit) => `
            <li class="recipe__ingredient">
              <svg class="recipe__ingredient--icon">
                <use href="${this.icons}#icon-check" />
              </svg>
              <div class="recipe__ingredient--description">
              <div class="recipe__ingredient--quantity">${quantity ? formatFraction(quantity) : ``}</div>
                <span class="recipe__ingredient--unit">${unit}</span>
                <span class="recipe__ingredient--name"> ${ingredient}</span>
              </div>
              <button class="btn--tiny">
                <svg>
                  <use href="${this.icons}#icon-plus-circle" />
                </svg>
              </button>
            </li>`;

  stepMarkup = (text, number = ``) => `
            <article class="recipe__directions--step">
              <h2>Step ${number}</h2>
              <p>${text}</p>
            </article>`;

  recipeMarkup = (title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl, verified, directions, isBookmarked) => `
        <div class="return-back-btn">
          <svg>
            <use href="${this.icons}#icon-arrow-left" />
          </svg>
        </div>
        <figure class="recipe__fig">
          <img src="${imageUrl}" alt="${title}" onerror="this.style.display = 'none'" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${this.icons}#icon-clock" />
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${this.icons}#icon-users" />
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings" data-update_by="-1">
                <svg>
                  <use href="${this.icons}#icon-minus-circle" />
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-update_by="1">
                <svg>
                  <use href="${this.icons}#icon-plus-circle" />
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__details-right-btns">
          ${
            verified
              ? `<div class="recipe__verified">
                   <svg>
                    <use href="${this.icons}#icon-check" />
                   </svg>
                 </div>`
              : ``
          }
          <button class="btn--round bookmark-btn">
            <svg>
              <use href="${this.icons}#icon-bookmark${isBookmarked ? `-fill` : ``}" />
            </svg>
          </button>
          </div>
        </div>

        <div class="recipe__ingredients">
          <div class="add-all-products-btn">
            <svg>
              <use href="${this.icons}#icon-bag" />
            </svg>
          </div>
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">${ingredients.reduce((acc, i) => i && acc + this.ingredientMarkup(i.description, i.quantity, i.unit), ``)}</ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          ${
            directions
              ? directions.reduce((acc, d, i) => d && acc + this.stepMarkup(d, i + 1), ``)
              : `<p class="recipe__directions-text">This recipe was carefully designed and tested by
            <span class="recipe__publisher">${publisher}</span>. Please check out directions at their website.</p>`
          }
          <a class="btn--small recipe__btn" href="${sourceUrl}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${this.icons}#icon-arrow-right" />
            </svg>
          </a>
        </div>`;

  renderRecipe(title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl, verified, directions, isBookmarked = false) {
    this.UIEls.recipe.container.innerHTML = ``;
    this.render(RecipeView.location, this.recipeMarkup(title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl, verified, directions, isBookmarked));
    this.UIEls.recipe.container.style.minHeight = window.getComputedStyle(this.UIEls.results.container).height;
    this.removeSpinner();
  }

  removeCurrentRecipe = () => (this.UIEls.recipe.container.innerHTML = ``);

  toggleBookmarkIcon() {
    const svg = document.querySelector(`.bookmark-btn use`);

    const currentHref = svg.getAttribute(`href`);
    const newHref = currentHref.includes(`fill`) ? currentHref.slice(0, -5) : `${currentHref}-fill`;

    svg.setAttribute(`href`, newHref);
  }

  slideIn = () => RecipeView.location.classList.add(`slide-in`);

  slideOut = () => RecipeView.location.classList.remove(`slide-in`);
}
