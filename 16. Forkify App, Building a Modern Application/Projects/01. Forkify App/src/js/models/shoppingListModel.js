import ResultsModel from "./resultsModel";
import { unitMap, unitAbbreviation } from "../utils/utils";

export default class ShoppingListModel extends ResultsModel {
  constructor(appState) {
    super(appState);
  }

  hasProducts = list => list.length > 0;

  addProducts(newProducts) {
    try {
      const shoppingList = this.appState.getState(`shoppingList`);

      for (const product of newProducts) {
        const { description, quantity, unit } = product;
        let existingProduct = shoppingList.find(item => item.description === description && (!item.unit || item.unit === unit));

        if (!existingProduct) {
          existingProduct = shoppingList.find(item => item.description === description);
        }

        if (!existingProduct) {
          shoppingList.push({ description, quantity, unit });
          continue;
        }

        if (!existingProduct.unit) {
          existingProduct.quantity += quantity;
          continue;
        }

        const tryConvert = unitMap[existingProduct.unit]?.[unit] || unitMap[existingProduct.unit]?.[unitAbbreviation[unit]];
        tryConvert ? (existingProduct.quantity += quantity * tryConvert) : shoppingList.push({ description, quantity, unit });
      }

      this.updateShoppingList(shoppingList);
      return true;
    } catch (err) {
      console.error(err);
      throw new Error(`Error adding products!`);
    }
  }

  removeProduct(unit, description) {
    try {
      const shoppingList = this.appState.getState(`shoppingList`);
      const updatedShoppingList = shoppingList.filter(product => product.unit !== unit || product.description !== description);

      this.updateShoppingList(updatedShoppingList);
      return true;
    } catch {
      throw new Error(`Error removing product: ${description}!`);
    }
  }

  updateShoppingList(shoppingList) {
    try {
      this.appState.updateState(`shoppingList`, shoppingList);
      this.syncLocalStorage(shoppingList);
    } catch {
      throw new Error(`Error updating shoppping list!`);
    }
  }

  syncLocalStorage = list => window.localStorage.setItem(`shoppingList`, JSON.stringify(list));
  getStoredList = () => this.appState.updateState(`shoppingList`, JSON.parse(window.localStorage.getItem(`shoppingList`)) ?? []);
}
