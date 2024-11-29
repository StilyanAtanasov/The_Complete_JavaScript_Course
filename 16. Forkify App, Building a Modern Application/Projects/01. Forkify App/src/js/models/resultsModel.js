import { PAGE_RESULTS_LIMIT } from "../config/config";
import Model from "./model";

export default class ResultsModel extends Model {
  constructor(appState) {
    super(appState);
  }

  buildResultsData(results) {
    const totalPages = Number.parseInt(results.length / PAGE_RESULTS_LIMIT) + (results.length % PAGE_RESULTS_LIMIT === 0 ? 0 : 1);

    return {
      results,
      totalPages,
      currentPage: 1,
    };
  }
}
