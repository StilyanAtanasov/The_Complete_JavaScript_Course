import View from "./view";
import { formatFraction } from "../utils/utils";

export default class RecipeView extends View {
  static location = document.querySelector(`.recipe`);

  constructor() {
    super(RecipeView.location);
  }

  showSpinner = () => this.renderSpinner(this.UIEls.recipe.container, `afterBegin`);

  onHashChange = handler => [`hashchange`, `load`].forEach(e => window.addEventListener(e, () => handler(window.location.hash)));
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

  ingredientMarkup = (ingredient, quantity, unit) => `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${this.icons}#icon-check" />
              </svg>
              
              <div class="recipe__description">
              ${quantity ? `<div class="recipe__quantity">${formatFraction(quantity)}</div>` : ``}
                <span class="recipe__unit">${unit}</span>
                ${ingredient}
              </div>
            </li>`;

  recipeMarkup = (title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl, isBookmarked) => `<figure class="recipe__fig">
          <img src="${imageUrl}" alt="${title}" class="recipe__img" />
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

          <div class="recipe__user-generated">
            <svg>
              <use href="${this.icons}#icon-user" />
            </svg>
          </div>
          <button class="btn--round bookmark-btn">
            <svg>
              <use href="${this.icons}#icon-bookmark${isBookmarked ? `-fill` : ``}" />
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">${ingredients.reduce((acc, i) => acc + this.ingredientMarkup(i.description, i.quantity, i.unit), ``)}</ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${publisher}</span>. Please check out directions at their website.
          </p>
          <a class="btn--small recipe__btn" href="${sourceUrl}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${this.icons}#icon-arrow-right" />
            </svg>
          </a>
        </div>`;

  renderRecipe(title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl, isBookmarked = false) {
    this.UIEls.recipe.container.innerHTML = ``;
    this.render(RecipeView.location, this.recipeMarkup(title, cookingTime, imageUrl, ingredients, publisher, servings, sourceUrl, isBookmarked));
  }

  removeCurrentRecipe = () => (this.UIEls.recipe.container.innerHTML = ``);

  toggleBookmarkIcon() {
    const svg = document.querySelector(`.bookmark-btn use`);

    const currentHref = svg.getAttribute(`href`);
    const newHref = currentHref.includes(`fill`) ? currentHref.slice(0, -5) : `${currentHref}-fill`;

    svg.setAttribute(`href`, newHref);
  }
}
