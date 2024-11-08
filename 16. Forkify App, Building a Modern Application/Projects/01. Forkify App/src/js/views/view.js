import { elements as UIEls } from "../utils/elements";

export default class View {
  constructor() {
    this.UIEls = UIEls;
  }

  static initListeners() {
    UIEls.header.searchBtn.addEventListener(`click`, () => console.log(`Loaded`));
  }
}
