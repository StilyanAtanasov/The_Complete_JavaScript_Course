import { elements as UIEls } from "../utils/elements";
import icons from "url:../../img/icons.svg";

export default class View {
  static #overlayRendered = true;
  static #overlayOnQueue = 0;

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

  #overlayMarkup = zIndex => `<div class="overlay" style="z-index: ${zIndex}"></div>`;

  #notificationMarkup = (message, id, error = false) => `
  <div class="notification ${id} ${error ? `error` : ``}">
    <p>${message}</p>
  </div>`;

  renderSpinner(container, position = `afterEnd`, global = false) {
    this.render(
      container,
      `<div class="spinner">
           <svg>
             <use href="${this.icons}#icon-loader"></use>
           </svg>
         </div> `,
      position
    );

    if (global && window.innerWidth <= 800) {
      this.render(
        document.querySelector(`.container`),
        `<div class="spinner global">
             <svg>
               <use href="${this.icons}#icon-loader"></use>
             </svg>
           </div> `,
        `beforeEnd`
      );
    }
  }

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
    this.render(document.body, this.#notificationMarkup(message, id, isError), `afterBegin`);
    const notification = document.querySelector(`.notification.${id}`);
    notification.style.animation = `notification ${Math.round(milliseconds / 1000)}s forwards`;
    setTimeout(() => notification && document.body.removeChild(notification), milliseconds);
  }

  renderOverlay(zIndex) {
    if (View.#overlayRendered) {
      this.removeOverlay();
      View.#overlayOnQueue++;
    }

    this.render(document.body, this.#overlayMarkup(zIndex), `beforeEnd`);
    View.#overlayRendered = true;
  }

  removeOverlay() {
    this.remove(document.body, `.overlay`);
    View.#overlayRendered = false;

    if (View.#overlayOnQueue > 0) {
      this.renderOverlay();
      View.#overlayOnQueue--;
    }
  }

  removeCurrentResults() {
    this.UIEls.results.resultsList.innerHTML = this.UIEls.results.paginationContainer.innerHTML = ``;
    this.remove(this.UIEls.results.container, `.add-btn`);
    this.remove(this.UIEls.results.container, `.sort-results--box`);
  }
}
