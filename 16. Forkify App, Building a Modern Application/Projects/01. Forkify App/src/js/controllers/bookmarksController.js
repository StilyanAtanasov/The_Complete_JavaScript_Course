import ResultsController from "./resultsController";
import BookmarksModel from "../models/bookmarksModel";
import BookmarksView from "../views/bookmarksView";

export default class BookmarksController extends ResultsController {
  #model;
  #view;

  constructor(appState) {
    super(appState);

    this.#model = new BookmarksModel(appState);
    this.#view = new BookmarksView();

    this.eventBus.subscribe(`OpenBookmarks`, this.handler(this.#controlBookmarksResults.bind(this)));
    this.eventBus.subscribe(`bookmark`, this.handler(this.#controlOnBookmark.bind(this)));
  }

  #controlBookmarksResults() {
    this.#view.removeCurrentResults();
    this.#view.updateTitle();
    if (this.#model.searchBookmarks() && this.getState(`currentPage`) === `Bookmarks`) {
      this.updateResults();
    }
  }

  #controlOnBookmark(recipe) {
    this.#model.isPresentBookmark(recipe.id) ? this.#model.deleteBookmark(recipe.id) : this.#model.createBookmark(recipe);
    this.getState(`search.query`) === `page-bookmarks` && this.updateResults(this.getState(`bookmarks`));
  }

  init = () => this.handler(this.#model.getStoredBookmarks)();
}
