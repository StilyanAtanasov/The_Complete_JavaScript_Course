import ResultsModel from "./resultsModel";
import convert from "convert-units";

export default class ShoppingListModel extends ResultsModel {
  constructor(appState) {
    super(appState);
  }

  updateShoppingList(newProducts) {
    const shoppingList = this.appState.getState(`shoppingList`);

    newProducts.forEach(product => {
      const { description, quantity, unit } = product;

      const existingProduct = shoppingList.find(item => item.description === description); // BUG

      try {
        const quantity = convert(quantity).from(unit).to(existingProduct.unit);
        existingProduct.quantity += quantity;
      } catch (err) {
        shoppingList.push({ description, quantity, unit });
      }
    });

    this.appState.updateState(`shoppingList`, shoppingList);
    this.syncLocalStorage(shoppingList);
  }

  syncLocalStorage = list => window.localStorage.setItem(`shoppingList`, JSON.stringify(list));
  getStoredList = () => this.appState.updateState(`shoppingList`, window.localStorage.getItem(`shoppingList`) ?? []);
}
