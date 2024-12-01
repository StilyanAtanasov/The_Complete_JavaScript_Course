import NavModel from "../models/navModel";
import NavView from "../views/navView";
import Controller from "./controller";

export default class NavController extends Controller {
  #model;
  #view;

  constructor(appState) {
    super(appState);

    this.#model = new NavModel(appState);
    this.#view = new NavView();
    this.eventBus.subscribe(`UpdatePage`, this.handler(this.#model.updateCurrentPage.bind(this)));
  }

  #controlNav(page) {
    if (page === this.getState(`currentPage`)) return;

    this.#model.updateCurrentPage(page);
    this.eventBus.publish(`Open${page}`, null);
    this.eventBus.publish(`RecipeSlideOut`, null);
  }

  init = () => this.#view.onClick(this.handler(this.#controlNav.bind(this)));
}
