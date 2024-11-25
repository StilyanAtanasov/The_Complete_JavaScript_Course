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

  notificationMarkup = (message, error = false) => `
  <div class="notification ${error ? `error` : ``}">
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
    this.render(document.body, this.notificationMarkup(message, isError), `afterBegin`);
    setTimeout(function () {
      const notifications = document.getElementsByClassName(`notification`);
      Array.from(notifications).forEach(function (n) {
        if (n.querySelector(`p`).textContent === message) {
          document.body.removeChild(n);
          return;
        }
      });
    }, milliseconds);
  }
}
