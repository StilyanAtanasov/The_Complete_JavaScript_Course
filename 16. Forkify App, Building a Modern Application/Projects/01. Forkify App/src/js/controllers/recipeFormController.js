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

    this.#view.onCloseForm(this.#controlCloseForm.bind(this));
    this.#view.onSubmit(this.#controlUploadRecipe.bind(this));
    this.#view.onAddIngredient(this.#controlAddIngredient.bind(this));
  }

  #controlUploadRecipe(data) {
    const recipe = this.#model.submitRecipe(this.#model.createRecipe(data));
    this.#controlCloseForm();
  }

  #controlCloseForm = () => this.#view.removeForm();

  #controlAddIngredient = () => this.#model.updateIngredientsCount(1) && this.#view.addIngredient(this.getState(`uploadRecipe.ingredientsCount`));
}
