import { elements as UIEls } from "../utils/elements";
import icons from "url:../../img/icons.svg";

export default class View {
  constructor() {
    this.UIEls = UIEls;
    this.icons = icons;
  }

  updateText = (el, newText) => (el.textContent = newText);

  render = (container, markup, position = `afterBegin`) => container.insertAdjacentHTML(position, markup);

  remove = (container, selector) => container.removeChild(document.querySelector(selector));

  renderSpinner = (container, position = `afterEnd`) =>
    this.render(
      container,
      `<div class="spinner">
           <svg>
             <use href="${this.icons}#icon-loader"></use>
           </svg>
         </div> `,
      position
    );
}
