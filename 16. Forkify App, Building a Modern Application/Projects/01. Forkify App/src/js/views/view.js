import { elements as UIEls } from "../utils/elements";
import icons from "url:../../img/icons.svg";

export default class View {
  constructor(location) {
    this.location = location;

    this.UIEls = UIEls;
    this.icons = icons;
  }

  updateText = (el, newText) => (el.textContent = newText);

  render = (container, markup, position = `afterBegin`) => container.insertAdjacentHTML(position, markup);

  remove(container, selector) {
    const element = document.querySelector(selector);
    element && container.removeChild(element);
  }

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

  update(markup) {
    const newElements = Array.from(document.createRange().createContextualFragment(markup).querySelectorAll(`*`));
    const curElements = Array.from(this.location.querySelectorAll(`*`));

    newElements.forEach((el, i) => {
      const curEl = curElements[i];
      if (!el.isEqualNode(curEl)) {
        if (el.firstChild?.nodeValue?.trim()) curEl.textContent = el.textContent;

        Array.from(el.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
      }
    });
  }
}
