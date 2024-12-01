import VerifyModel from "../models/verifyModel";
import VerifyView from "../views/verifyView";
import Controller from "./controller";

export default class VerifyController extends Controller {
  #model;
  #view;

  constructor(appState) {
    super(appState);

    this.#model = new VerifyModel(appState);
    this.#view = new VerifyView();

    this.eventBus.subscribe(`VerifyRecipe`, this.handler(this.#controlSubmission.bind(this)));
  }

  #controlSubmission(id) {
    this.eventBus.publish(`FetchRecipe`, { sender: `VerifyRecipeReady`, id });
    this.eventBus.subscribe(`VerifyRecipeReady`, this.handler(this.#controlVerification.bind(this)));
  }

  async #controlVerification(recipe) {
    await this.#model.verifyRecipe(recipe);
    this.eventBus.unsubscribe(`VerifyRecipeReady`, this.handler(this.#controlVerification.bind(this)));
  }
}
