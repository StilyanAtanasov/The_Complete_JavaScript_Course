import AdminModel from "../models/adminModel";
import { timeout } from "../utils/utils";
import AdminView from "../views/adminView";
import Controller from "./controller";

export default class AdminController extends Controller {
  #model;
  #view;

  constructor(appState) {
    super(appState);

    this.#model = new AdminModel(appState);
    this.#view = new AdminView();

    this.eventBus.subscribe(`OpenAdminPanel`, this.handler(this.#controlOpenPanel.bind(this)));
    this.eventBus.subscribe(`CloseAdminPanel`, this.handler(this.#controlClosePanel.bind(this)));
  }

  #controlClosePanel = () => this.#view.removePanel();

  #controlOpenPanel() {
    this.#view.renderPanel();

    this.#view.onDelete(this.handler(this.#controlDelete.bind(this)));
    this.#view.onVerify(this.handler(this.#controlVerification.bind(this)));
  }

  async #controlDelete() {
    const formData = this.#controlGetData();
    if (!(await this.#controlCredentialsValidation(formData))) return;

    console.log(formData);
    const id = formData.id;

    const response = await this.#assureVerified(id, `Cannot delete verified recipe!`);
    if (!response.ok) return;

    const message = await this.#model.deleteRecipe(id);
    this.#view.renderNotification(message, 4000);
    this.#view.resetForm();
  }

  async #controlVerification() {
    const formData = this.#controlGetData();
    if (!(await this.#controlCredentialsValidation(formData))) return;

    const id = formData.id;
    const response = await this.#assureVerified(id, `Cannot verify already verified recipe!`);
    if (!response.ok) return;

    this.#model.deleteRecipe(id);
    const responseMessage = await this.#model.verifyRecipe(response.recipe);
    this.#view.renderNotification(responseMessage, 4000);
    this.#view.resetForm();
  }

  #controlGetData() {
    const data = this.#view.getFormData();
    if (!data) throw new Error(`Please, fill all the fields!`);
    return data;
  }

  async #controlCredentialsValidation(data) {
    const isValid = await this.#model.validateCredentials(data.password);
    if (!isValid) {
      this.#view.renderNotification(`Incorrect password`, 3000, true);
      return false;
    }

    return true;
  }

  async #assureVerified(id, errMessage) {
    const response = await Promise.race([this.#checkRecipe(id), timeout(7000)]);
    if (!response) throw new Error(`Error accessing recipe!`);

    if (response.err) {
      this.#view.renderNotification(response.err, 3000, true);
      return { ok: false };
    }
    if (!this.#model.assureCustom(response)) {
      this.#view.renderNotification(errMessage, 3000, true);
      return { ok: false };
    }

    return { ok: true, recipe: response };
  }

  #checkRecipe(id) {
    return new Promise(resolve => {
      const handler = arg => {
        this.eventBus.unsubscribe(`AdminGetRecipe`, handler);
        resolve(arg);
      };

      this.eventBus.subscribe(`AdminGetRecipe`, handler);
      this.eventBus.publish(`FetchRecipe`, { sender: `AdminGetRecipe`, id, alwaysFetch: true });
    });
  }
}
