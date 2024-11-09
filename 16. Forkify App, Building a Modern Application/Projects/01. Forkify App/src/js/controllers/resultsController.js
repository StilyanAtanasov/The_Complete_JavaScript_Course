import ResultsModel from "../models/resultsModel";
import ResultsView from "../views/resultsView";
import Controller from "./controller";

export default class ResultsController extends Controller {
  #model;
  #view;

  constructor() {
    super();
    this.#model = new ResultsModel();
    this.#view = new ResultsView();
    this.eventBus.subscribe(`searched`, this.#controlSearchResults.bind(this));
  }

  async #controlSearchResults(prompt) {
    this.#view.updateTitle(prompt);
    this.#view.remove(this.#view.UIEls.results.container, `.spinner`);

    console.log(this.appState);
    this.appState.search.response.forEach(r => this.#view.render(this.#view.UIEls.results.title, this.#view.buildMarkup(r.id, r[`image_url`], r.title, r.publisher), `afterEnd`));
  }
}
