import ResultsView from "./resultsView";

export default class ShoppingListView extends ResultsView {
  static location = document.querySelector(`.search__results--results`);

  constructor() {
    super();
  }

  productMarkup = (name, quantity, unit) => `
  <div data-id="${name}" class="list-product">
    <p>${quantity} <span id="product-unit">${unit}</span> <span id="product-name">${name}</span></p>
    <svg>
      <use href="${this.icons}#icon-delete"></use>
    </svg>
  </div>
  `; // TODO

  updateTitle = () => this.updateText(this.UIEls.results.title, `Shopping List`);

  renderProducts = products => products.forEach(p => this.render(ShoppingListView.location, this.productMarkup(p.description, p.quantity, p.unit), `beforeEnd`));
  emptyList = () => (ShoppingListView.location.innerHTML = ``);

  onRemove = handler =>
    this.UIEls.results.container.addEventListener(`click`, function (e) {
      const target = e.target.closest(`.list-product`);
      if (!target) return;

      handler(target.querySelector(`#product-unit`).textContent, target.querySelector(`#product-name`).textContent);
    });
}
