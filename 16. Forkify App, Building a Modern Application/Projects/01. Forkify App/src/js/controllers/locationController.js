import LocationView from "../views/locationView";
import Controller from "./controller";

export default class LocationController extends Controller {
  #view;

  constructor(appState) {
    super(appState);
    this.#view = new LocationView();
  }

  #controlLocationChange = ({ request, data }) => this.eventBus.publish(request, data);

  init = () => this.#view.onHashChange(this.handler(this.#controlLocationChange.bind(this)));
}
