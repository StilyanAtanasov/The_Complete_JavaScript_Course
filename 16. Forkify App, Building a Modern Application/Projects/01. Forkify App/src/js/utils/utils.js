export const timeout = (ms, message) => new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));

export function getPageBounds(page, pageLimit, totalResults) {
  const end = page * pageLimit - 1;
  const lastResult = totalResults - 1;

  return {
    start: (page - 1) * pageLimit,
    end: end >= lastResult ? lastResult : end,
  };
}
