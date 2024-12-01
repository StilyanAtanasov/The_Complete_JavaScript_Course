import View from "./view";

export default class LocationView extends View {
  constructor() {
    super();
  }

  onHashChange = handler =>
    [`hashchange`, `load`].forEach(e =>
      window.addEventListener(e, function () {
        const hash = window.location.hash;
        const hashIndex = hash.indexOf(`/`);
        const id = hash.slice(1, hashIndex === -1 ? hash.length : hashIndex);

        handler({
          request: `RecipeRequested`,
          data: id,
        });

        const href = window.location.href;
        if (href.endsWith(`verify`)) {
          handler({
            request: `VerifyRecipe`,
            data: id,
          });
        }
      })
    );
}
