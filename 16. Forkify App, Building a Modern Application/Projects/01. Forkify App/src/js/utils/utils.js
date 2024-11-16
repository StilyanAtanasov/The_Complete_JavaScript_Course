import fracty from "fracty";

function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}

export const timeout = (ms, message) => new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));

export function getPageBounds(page, pageLimit, totalResults) {
  const end = page * pageLimit - 1;
  const lastResult = totalResults - 1;

  return {
    start: (page - 1) * pageLimit,
    end: end >= lastResult ? lastResult : end,
  };
}

export function formatFraction(number) {
  const fraction = fracty(number);
  if (!fraction.includes(`/`)) return fraction;

  const [wholePart, fractionalPart] = fraction.includes(` `) ? fraction.split(` `) : [null, fraction];
  let [numerator, denominator] = fractionalPart.split(`/`).map(Number);

  const divider = Number(`1`.padEnd(String(numerator).length - 1, `0`));
  numerator = Math.round(numerator / divider);
  denominator = Math.round(denominator / divider);

  const divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;

  const simplifiedFraction = `${numerator}/${denominator}`;
  return wholePart ? `${wholePart} ${simplifiedFraction}` : simplifiedFraction;
}
