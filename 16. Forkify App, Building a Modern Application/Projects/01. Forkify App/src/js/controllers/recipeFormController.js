import RecipeFormView from "../views/recipeFormView";
import Controller from "./controller";

export default class RecipeFormController extends Controller {
  #view;

  constructor(appState) {
    super(appState);

    this.#view = new RecipeFormView();
    this.eventBus.subscribe(`OpenRecipeForm`, this.#controlOpenForm.bind(this));
  }

  #controlOpenForm() {
    this.#view.renderForm();
    this.#view.onCloseForm(this.#controlCloseForm.bind(this));
  }

  #controlCloseForm() {
    this.#view.removeForm();
  }
}
