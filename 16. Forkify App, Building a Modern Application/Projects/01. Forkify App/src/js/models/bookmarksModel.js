import ResultsModel from "./resultsModel";

export default class BookmarksModel extends ResultsModel {
  constructor(appState) {
    super(appState);
  }

  isPresentBookmark = id => this.appState.getState(`bookmarks`).reduce((acc, b) => acc || b.id === id, false);

  createBookmark(recipe) {
    try{
    this.appState.updateState(`bookmarks`, [...this.appState.getState(`bookmarks`), recipe]);
    this.syncLocalStorage();
    }
    catch {
      throw new Error(`Error bookmarking the recipe!`)
      }
  }

  deleteBookmark(id) {
    try {
    const bookmarks = [...this.appState.getState(`bookmarks`)];
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].id === id) {
        bookmarks.splice(i, 1);
        break;
      }
    }

    this.appState.updateState(`bookmarks`, bookmarks);
    this.syncLocalStorage();
  }
    catch {
      throw new Error(`Error removing bookmark!`)
  }
  }

  searchBookmarks() {
    try {
    const bookmarks = this.appState.getState(`bookmarks`);
    if (bookmarks.length === 0) {
      return false;
    }
    
    const totalPages = Number.parseInt(bookmarks.length / this.appState.getState(`search.resultsPerPage`)) + 1;
    
    this.appState.updateState(`search.query`, `page-bookmarks`);
    this.appState.updateState(`search.response`, bookmarks);
    this.appState.updateState(`search.currentPage`, 1);
    this.appState.updateState(`search.totalPages`, totalPages);
    
    return true;
  }
  catch {
  throw new Error(`Error retrieving your bookmarked recipes!`)
  }
}
  
  syncLocalStorage = () => window.localStorage.setItem(`bookmarks`, JSON.stringify(this.appState.getState(`bookmarks`)));
  getStoredBookmarks = async () => this.appState.updateState(`bookmarks`, JSON.parse(window.localStorage.getItem(`bookmarks`)) ?? []);
}
