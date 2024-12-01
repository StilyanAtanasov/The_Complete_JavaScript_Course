import ResultsController from "./resultsController";
import ShoppingListView from "../views/shoppingListView";
import ShoppingListModel from "../models/shoppingListModel";

export default class ShoppingListController extends ResultsController {
  #model;
  #view;

  constructor(appState) {
    super(appState);

    this.#model = new ShoppingListModel(appState);
    this.#view = new ShoppingListView();

    this.eventBus.subscribe(`OpenShoppingList`, this.handler(this.#controlShoppingListResults.bind(this)));
    this.eventBus.subscribe(`AddProduct`, this.handler(this.#controlAddProduct.bind(this)));
    this.init();
  }

  #controlShoppingListResults() {
    this.#view.removeCurrentResults();
    this.#view.removeListeners();
    this.#view.updateTitle();
    this.#view.onRemove(this.handler(this.#controlRemoveProduct.bind(this)));

    if (!this.#model.hasProducts(this.getState(`shoppingList`))) {
      this.#view.renderNotification(`Nothing to buy yet!`, 4000);
      return;
    }

    this.#view.renderProducts(this.getState(`shoppingList`));
  }

  #controlAddProduct = products => this.#model.addProducts(products) && this.#reloadList();

  #controlRemoveProduct = (unit, name, target) => this.#model.removeProduct(unit, name) && this.#view.removeProduct(target);

  #reloadList() {
    if (this.getState(`currentPage`) !== `ShoppingList`) return;
    this.#view.removeCurrentResults();
    this.#view.renderProducts(this.getState(`shoppingList`));
  }

  init = () => this.handler(this.#model.getStoredList)();
}
