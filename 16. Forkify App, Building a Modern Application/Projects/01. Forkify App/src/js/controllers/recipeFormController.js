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
    this.eventBus.subscribe(`OpenRecipeForm`, this.handler(this.#controlOpenForm.bind(this)));
  }

  #controlOpenForm() {
    this.#view.renderForm();

    this.#view.onCloseForm(this.handler(this.#controlCloseForm.bind(this)));
    this.#view.onSubmit(this.handler(this.#controlUploadRecipe.bind(this)));
    this.#view.onAddIngredient(this.handler(this.#controlAddIngredient.bind(this)));
    this.#view.onRemoveIngredient(this.handler(this.#controlRemoveIngredient.bind(this)));
  }

  #controlUploadRecipe(data) {
    this.#model.submitRecipe(this.#model.createRecipe(data));
    this.#view.renderNotification(`Recipe published!`, 4500);
    this.#controlCloseForm();
  }

  #controlCloseForm = () => this.#view.removeForm();

  #controlAddIngredient() {
    if (this.#model.updateIngredientsCount(1)) this.#view.toggleAddIngredientsBtn(true);
    this.#view.addIngredient(this.getState(`uploadRecipe.ingredientsCount`));
  }

  #controlRemoveIngredient(target) {
    if (this.#model.removeIngredient()) this.#view.toggleAddIngredientsBtn(false);
    this.#view.removeElement(target);
    this.#view.shiftIngredientsIndexes();
  }
}
