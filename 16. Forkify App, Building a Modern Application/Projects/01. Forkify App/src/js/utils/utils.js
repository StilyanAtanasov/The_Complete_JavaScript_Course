import fracty from "fracty";

function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}

export const timeout = (ms, message = `Request took too long!`) => new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));

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

export async function request(url, options = {}) {
  const response = await Promise.race([fetch(url, options), timeout(5000, `Request took too long!`)]);
  if (!response.ok) throw new Error(`API call failed with status ${response.status}`);
  return await response.json();
}

export const unitMap = {
  g: { g: 1, kg: 0.001, mg: 1000, oz: 0.0353, lb: 0.0022 },
  kg: { g: 1000, kg: 1, mg: 1_000_000, oz: 35.274, lb: 2.20462 },
  mg: { g: 0.001, kg: 0.000001, mg: 1, oz: 0.0000353, lb: 0.0000022 },
  oz: { g: 28.3495, kg: 0.02835, mg: 28349.5, oz: 1, lb: 0.0625 },
  lb: { g: 453.592, kg: 0.453592, mg: 453592, oz: 16, lb: 1 },
  ml: { ml: 1, l: 0.001, tsp: 0.202884, tbsp: 0.067628, cup: 0.004227, oz: 0.033814 },
  l: { ml: 1000, l: 1, tsp: 202.884, tbsp: 67.628, cup: 4.227, oz: 33.814 },
  tsp: { tsp: 1, tbsp: 0.333333, cup: 0.0208333, ml: 4.92892, oz: 0.166667 },
  tbsp: { tsp: 3, tbsp: 1, cup: 0.0625, ml: 14.7868, oz: 0.5 },
  cups: { tsp: 48, tbsp: 16, cup: 1, ml: 236.588, oz: 8 },
};

export const unitAbbreviation = {
  gram: "g",
  grams: "g",
  kilogram: "kg",
  kilograms: "kg",
  milligram: "mg",
  milligrams: "mg",
  ounce: "oz",
  ounces: "oz",
  pound: "lb",
  pounds: "lb",
  milliliter: "ml",
  milliliters: "ml",
  liter: "l",
  liters: "l",
  teaspoon: "tsp",
  teaspoons: "tsp",
  tsps: "tsp",
  tablespoon: "tbsp",
  tablespoons: "tbsp",
  tbsps: "tbsp",
  cup: "cups",
  cups: "cups",
};

for (const [fullName, shortForm] of Object.entries(unitAbbreviation)) unitMap[fullName] = unitMap[shortForm];
