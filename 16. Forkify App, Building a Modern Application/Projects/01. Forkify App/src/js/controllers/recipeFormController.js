import RecipeFormModel from "../models/recipeFormModel";
import RecipeFormView from "../views/recipeFormView";
import Controller from "./controller";

export default class RecipeFormController extends Controller {
  #model;
  #view;

  constructor(appState) {
    super(appState);

    this.#model = new RecipeFormModel(appState);
    this.#view = new RecipeFormView();
    this.eventBus.subscribe(`OpenRecipeForm`, this.#controlOpenForm.bind(this));
  }

  #controlOpenForm() {
    this.#view.renderForm();
    this.#model.createRecipe();

    this.#view.onCloseForm(this.#controlCloseForm.bind(this));
  }

  #controlCloseForm() {
    this.#view.removeForm();
  }
}
