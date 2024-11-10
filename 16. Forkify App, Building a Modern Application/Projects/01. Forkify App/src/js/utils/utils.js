export const timeout = (ms, message) => new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));
export const getPageBounds = (page, pageLimit) => ({
  start: (page - 1) * pageLimit,
  end: page * pageLimit - 1,
});
