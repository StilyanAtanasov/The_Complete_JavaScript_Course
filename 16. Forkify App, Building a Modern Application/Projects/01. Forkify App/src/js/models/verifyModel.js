import { timeout } from "../utils/utils";
import Model from "./model";

export default class VerifyModel extends Model {
  constructor(appState) {
    super(appState);
  }

  async verifyRecipe(recipe) {
    try {
      const response = await Promise.race([
        fetch(`.netlify/functions/verifyRecipe`, {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify(recipe),
        }),
        timeout(5000, `Search request took too long!`),
      ]);

      console.log(await response.json());

      if (!response.ok) throw new Error();

      return true;
    } catch {
      throw new Error(`Error verifying recipe!`);
    }
  }
}
