import ResultsView from "./resultsView";

export default class ShoppingListView extends ResultsView {
  static location = document.querySelector(`.search__results--results`);

  constructor() {
    super();
  }

  productMarkup = (name, quantity, unit) => `
  <div data-id="${name}" class="list-product">
    <p>${quantity} ${unit}</p>
    <p>${name}</p>
    <span>X</span> 
  </div>
  `; // TODO

  updateTitle = () => this.updateText(this.UIEls.results.title, `Shopping List`);

  renderProducts = products => products.forEach(p => this.render(ShoppingListView.location, this.productMarkup(p.description, p.quantity, p.unit), `beforeEnd`));
  emptyList = () => (ShoppingListView.location.innerHTML = ``);
}
