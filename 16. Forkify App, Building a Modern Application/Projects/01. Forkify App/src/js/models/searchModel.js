import * as config from "../config/config";
import Model from "./model";

export default class SearchModel extends Model {
  constructor() {
    super();
  }

  async searchRecipe(searchPrompt) {
    const response = await fetch(`${config.API_URL}?search=${searchPrompt}`);
    return await response.json();
  }
}
