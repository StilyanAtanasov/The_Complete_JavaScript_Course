import ResultsController from "./resultsController";
import ShoppingListView from "../views/shoppingListView";
import ShoppingListModel from "../models/ShoppingListModel";

export default class ShoppingListController extends ResultsController {
  #model;
  #view;

  constructor(appState) {
    super(appState);

    this.#model = new ShoppingListModel(appState);
    this.#view = new ShoppingListView();

    this.eventBus.subscribe(`OpenShoppingList`, this.#controlShoppingListResults.bind(this));
    this.eventBus.subscribe(`AddProduct`, this.#controlAddProduct.bind(this));
    this.init();
  }

  #controlShoppingListResults() {
    this.#view.removeCurrentResults();
    this.#view.updateTitle();
  }

  #controlAddProduct(products) {
    this.#model.updateShoppingList(products);
    this.#view.emptyList();
    this.#view.renderProducts(this.getState(`shoppingList`));
  }

  init = () => this.#model.getStoredList();
}
