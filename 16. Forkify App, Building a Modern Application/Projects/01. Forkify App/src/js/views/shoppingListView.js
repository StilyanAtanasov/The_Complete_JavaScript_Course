import { formatFraction } from "../utils/utils";
import ResultsView from "./resultsView";

export default class ShoppingListView extends ResultsView {
  static location = document.querySelector(`.search__results--results`);
  static removeCallback;

  constructor() {
    super();
  }

  productMarkup = (name, quantity, unit) => `
  <div class="list-product">
  <span id="product-quantity">${quantity ? formatFraction(quantity) : ``}</span> 
    <span id="product-unit">${unit || ``}</span> 
    <span id="product-name">${name}</span>
    <svg>
      <use href="${this.icons}#icon-delete"></use>
    </svg>
  </div>
  `;

  updateTitle = () => this.updateText(this.UIEls.results.title, `Shopping List`);

  renderProducts = products => products.forEach(p => this.render(ShoppingListView.location, this.productMarkup(p.description, p.quantity || ``, p.unit || ``), `beforeEnd`));

  removeProduct = target => ShoppingListView.location.removeChild(target);

  onRemove(handler) {
    ShoppingListView.removeCallback = function (e) {
      const target = e.target.closest(`.list-product`);
      if (!target) return;

      handler(target.querySelector(`#product-unit`).textContent, target.querySelector(`#product-name`).textContent, target);
    };

    this.UIEls.results.container.addEventListener(`click`, ShoppingListView.removeCallback);
  }

  removeListeners = () => this.UIEls.results.container.removeEventListener(`click`, ShoppingListView.removeCallback);
}
