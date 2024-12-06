import View from "./view";

export default class AdminView extends View {
  constructor() {
    super();
  }

  onDelete = handler => document.querySelector(`.admin__form--btn.btn-delete`).addEventListener(`click`, () => handler());

  onVerify = handler => document.querySelector(`.admin__form--btn.btn-verify`).addEventListener(`click`, () => handler());

  #adminMarkup = () => `
      <section class="admin">
        <h2 class="admin__title">Admin Panel</h2>
        <form class="admin__form">
          <label for="id">Recipe ID</label>
          <input id="id" name="id" type="text" required />
          <label for="password">Admin Password</label>
          <input id="password" name="password" type="password" required />
          </form>
          <button class="admin__form--btn btn-verify">Verify</button>
          <button class="admin__form--btn btn-delete">Delete</button>
      </section>`;

  renderPanel() {
    this.render(document.querySelector(`.body`), this.#adminMarkup, `beforeEnd`);
    this.renderOverlay(99);
  }

  removePanel() {
    this.remove(document.querySelector(`.body`), `.admin`);
    this.removeOverlay();
  }

  getFormData() {
    const form = document.querySelector(`.admin__form`);
    if (!form.reportValidity()) return;
    const data = Object.fromEntries([...new FormData(form)]);

    return data;
  }

  resetForm = () => document.querySelector(`.admin__form`).reset();
}
