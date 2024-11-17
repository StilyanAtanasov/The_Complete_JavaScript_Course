import View from "./view";

export default class NavView extends View {
  constructor() {
    super();
  }

  onClick = handler =>
    this.UIEls.nav.container.addEventListener(`click`, function (e) {
      const target = e.target.closest(`.nav__btn`);
      if (!target) return;

      handler(target.dataset.page);
    });
}
