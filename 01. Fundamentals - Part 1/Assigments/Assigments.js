// ---------- ASSIGMENTS ----------

// ----- VALUES AND VALIABLES -----
const country = "Bulgaria";
const continent = "Europe";
let population = 7;

console.log(country);
console.log(continent);
console.log(population);

// ----- DATA TYPES -----
const isIsland = false;
let language;

console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

// ----- LET, CONST AND VAR -----
language = "Bulgarian";
// The next line is an example only to show that the value of a constant cannot be changed!
// country = 'Romania'; // Throws an error!!!

// ----- BASIC OPERATORS -----
const halfPopulation = population / 2;
population++;
console.log(population, halfPopulation);

const finlandPopulation = 6;
console.log(population > finlandPopulation);

const averagePopulation = 33;
console.log(population < averagePopulation);

let description = "Bulgaria is in Europe, and its 8 million people speak Bulgarian.";
console.log(description);

// ----- STRINGS AND TEMPLATE LITERALS -----
description = `${country} is in ${continent}, and its ${population} million people speak ${language}.`;
console.log(description);

// ----- TAKING DECISIONS: IF/ELSE STATEMENTS
if (population > 33) console.log(`${country}'s population is above average.`);
else console.log(`${country}'s population is ${33 - population} million below average.`);

// ----- TYPE CONVERSION AND COERCION -----
console.log("9" - "5"); // 4
console.log("19" - "13" + "17"); // 617
console.log("19" - "13" + 17); // 23
console.log("123" < 57); // false
console.log(5 + 6 + "4" + 9 - 4 - 2); // 1143

// ----- EQUALITY OPERATORS -----
const numNeighbours = Number(prompt(`How many neighbour countries does your country have?`));

if (numNeighbours === 1) console.log(`Only 1 border!`);
else if (numNeighbours > 1) console.log(`More than 1 border!`);
else console.log(`No borders!`);

// ----- LOGICAL OPERATORS -----
if (language === "English" && population < 50 && !isISland) console.log(`Yoy should live in ${country} :)`);
else console.log(`${country} does not meet your criteria :(`);

// ----- THE SWITCH STATEMENT -----
switch (language) {
  case `chinese`:
  case `mandarin`:
    console.log(`MOST number of native speakers!`);
    break;
  case `spanish`:
    console.log(`2nd place in number of native speakers`);
    break;
  case `english`:
    console.log(`3rd place`);
    break;
  case `hindi`:
    console.log(`Number 4`);
    break;
  case `arabic`:
    console.log(`5th most spoken language`);
    break;
  default:
    console.log(`Great language too :D`);
    break;
}

// ----- THE CONDITIONAL (TERNARY) OPERATOR -----
console.log(`${country}'s population is ${population > 33 ? "above" : "below"} average`);
