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

  generateUniqueId = () => `id-${Date.now()}`;

  notificationMarkup = (message, id, error = false) => `
  <div class="notification ${id} ${error ? `error` : ``}">
    <p>${message}</p>
  </div>`;

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

  renderNotification(message, milliseconds, isError = false) {
    const id = this.generateUniqueId();
    this.render(document.body, this.notificationMarkup(message, id, isError), `afterBegin`);
    const notification = document.querySelector(`.notification.${id}`);
    notification.style.animation = `notification ${Math.round(milliseconds / 1000)}s forwards`;
    setTimeout(() => notification && document.body.removeChild(notification), milliseconds);
  }
}
