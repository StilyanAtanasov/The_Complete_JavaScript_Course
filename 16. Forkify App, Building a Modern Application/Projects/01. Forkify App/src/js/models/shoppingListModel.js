import ResultsModel from "./resultsModel";
import convert from "convert-units";

export default class ShoppingListModel extends ResultsModel {
  constructor(appState) {
    super(appState);
  }

  addProducts(newProducts) {
    try {
    const shoppingList = this.appState.getState(`shoppingList`);

    newProducts.forEach(product => {
      const { description, quantity, unit } = product;
      const existingProduct = shoppingList.find(item => item.description === description);

      if (existingProduct) {
        try {
          const newQuantity = convert(quantity).from(unit).to(existingProduct.unit);
          existingProduct.quantity += newQuantity;
        } catch (err) {
          //   shoppingList.push({ description, quantity, unit }); FIX
        }
      }
      shoppingList.push({ description, quantity, unit });
    });

    this.updateShoppingList(shoppingList);
  }
  catch {
    throw new Error(`Error adding products!`)
  }
  }

  removeProduct(unit, description) {
    try {
    const shoppingList = this.appState.getState(`shoppingList`);
    const updatedShoppingList = shoppingList.filter(product => product.unit !== unit || product.description !== description);

    this.updateShoppingList(updatedShoppingList);
    }
    catch {
      throw new Error(`Error removing product: ${description}!`)
    }
  }

  updateShoppingList(shoppingList) {
    try{
    this.appState.updateState(`shoppingList`, shoppingList);
    this.syncLocalStorage(shoppingList);
    }
    catch {
      throw new Error(`Error updating shoppping list!`)
    }
  }

  syncLocalStorage = list => window.localStorage.setItem(`shoppingList`, JSON.stringify(list));
  getStoredList = () => this.appState.updateState(`shoppingList`, JSON.parse(window.localStorage.getItem(`shoppingList`)) ?? []);
}
