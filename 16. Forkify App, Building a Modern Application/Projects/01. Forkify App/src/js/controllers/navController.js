import NavView from "../views/navView";
import Controller from "./controller";

export default class NavController extends Controller {
  #view;

  constructor(appState) {
    super(appState);
    this.#view = new NavView();
  }

  #controlNav(page) {
    this.eventBus.publish(`Open${page}`, null);
    this.eventBus.publish(`RecipeSlideOut`, null);
  }

  init = () => this.#view.onClick(this.handler(this.#controlNav.bind(this)));
}
