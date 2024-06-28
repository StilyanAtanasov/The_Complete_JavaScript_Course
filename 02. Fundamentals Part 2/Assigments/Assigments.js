// --------- ASSIGMENTS ---------

"use strict";

// --- FUNCTIONS
function describeCountry(country, population, capitalCity) {
  return `${country} has ${population} million people and its capital city is ${capitalCity}.`;
}

const descriptionOfBulgaria = describeCountry(`Bulgaria`, 7, `Sofia`);
const descriptionOfFinland = describeCountry(`Finland`, 6, `Helsinki`);
const descriptionOfEngland = describeCountry(`England`, 63, `London`);

console.log(descriptionOfBulgaria);
console.log(descriptionOfFinland);
console.log(descriptionOfEngland);

// --- FUNCTION DECLARATIONS VS. EXPRESSIONS
function percentageOfWorld1(population) {
  return (population / 7900) * 100;
}

const percentageOfWorldInBulgaria1 = percentageOfWorld1(7);
const percentageOfWorldInFinland1 = percentageOfWorld1(6);
const percentageOfWorldInEngland1 = percentageOfWorld1(63);

console.log(percentageOfWorldInBulgaria1, percentageOfWorldInFinland1, percentageOfWorldInEngland1);

const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
};

const percentageOfWorldInBulgaria2 = percentageOfWorld2(7);
const percentageOfWorldInFinland2 = percentageOfWorld2(6);
const percentageOfWorldInEngland2 = percentageOfWorld2(63);

console.log(percentageOfWorldInBulgaria2, percentageOfWorldInFinland2, percentageOfWorldInEngland2);

// --- ARROW FUNCTIONS
const percentageOfWorld3 = (population) => (population / 7900) * 100;

const percentageOfWorldInBulgaria3 = percentageOfWorld3(7);
const percentageOfWorldInFinland3 = percentageOfWorld3(6);
const percentageOfWorldInEngland3 = percentageOfWorld3(63);

console.log(percentageOfWorldInBulgaria3, percentageOfWorldInFinland3, percentageOfWorldInEngland3);

// --- FUNCTIONS CALLING OTHER FUNCTIONS
function describePopulation(country, population) {
  const percentage = percentageOfWorld1(population);
  return `${country} has ${population} million people, which is about ${percentage}% of the world.`;
}

const bulgariaPopulationDescription = describePopulation(`Bulgaria`, 7);
const finlandPopulationDescription = describePopulation(`Finland`, 6);
const englandPopulationDescription = describePopulation(`England`, 63);

console.log(bulgariaPopulationDescription, finlandPopulationDescription, englandPopulationDescription);

// INTRODUCTION TO ARRAYS

const populations = [7, 6, 63, 1441];

console.log(populations.length === 4);

const percentages = [percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]), percentageOfWorld1(populations[2]), percentageOfWorld1(populations[3])];
console.log(percentages);

// BASIC ARRAY OPERATIONS (METHODS)

const neighbours = [`Turkey`, `Greece`, `Romania`, `Serbia`, `Makedonia`];

neighbours.push(`Utopia`);
neighbours.pop();

if (neighbours.includes(`Germany`) === false) {
  console.log(`Probably not a central European country :D`);
}

const indexOfRomania = neighbours.indexOf(`Romania`);
neighbours[indexOfRomania] = `Republic of Romania`;

// INTRODUCTION TO OBJECTS

let myCountry = {
  country: `Bulgaria`,
  capital: `Sofia`,
  language: `bulgarian`,
  population: 7,
  neighbours: [`Turkey`, `Greece`, `Romania`, `Serbia`, `Makedonia`],
};

console.log(myCountry);

// DOT VS. BRACKET NOTATION

console.log(`${myCountry.country} has ${myCountry.population} million bulgarian-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital city called ${myCountry.capital}.`);

myCountry.population += 2;
console.log(myCountry);
myCountry[`population`] -= 2;
console.log(myCountry);

// OBJECT METHODS

myCountry = {
  country: `Bulgaria`,
  capital: `Sofia`,
  language: `bulgarian`,
  population: 7,
  neighbours: [`Turkey`, `Greece`, `Romania`, `Serbia`, `Makedonia`],

  describe: function () {
    this.finalResult = `${this.country} has ${this.population} million bulgarian-speaking people, ${this.neighbours.length} neighbouring countries and a capital city called ${this.capital}.`;
    return this.finalResult;
  },
};

console.log(myCountry.describe());

myCountry = {
  country: `Bulgaria`,
  capital: `Sofia`,
  language: `bulgarian`,
  population: 7,
  neighbours: [`Turkey`, `Greece`, `Romania`, `Serbia`, `Makedonia`],

  describe: function () {
    this.finalResult = `${this.country} has ${this.population} million bulgarian-speaking people, ${this.neighbours.length} neighbouring countries and a capital city called ${this.capital}.`;
    return this.finalResult;
  },

  checkIsland: function () {
    return this.neighbours.length > 0 ? false : true;
  },
};

console.log(myCountry.checkIsland());

//  ITERATION: THE FOR LOOP

for (let voterNum = 1; voterNum <= 50; voterNum++) {
  console.log(`Voter number ${voterNum} is currently voting`);
}

// LOOPING ARRAYS, BREAKING AND CONTINUING

const percentages2 = [];

for (let i = 0; i < populations.length; i++) {
  percentages2.push(percentageOfWorld1(populations[i]));
}

console.log(percentages);
console.log(percentages2);

// LOOPING BACKWARDS AND LOOPS IN LOOPS

const listOfNeighbours = [[`Canada`, `Mexico`], [`Spain`], [`Norway`, `Sweden`, `Russia`]];

for (let i = 0; i < listOfNeighbours.length; i++) {
  for (let ii = 0; ii < listOfNeighbours[i].length; ii++) {
    console.log(`Neighbour: ${listOfNeighbours[i][ii]}`);
  }
}

// THE WHILE LOOP

const percentages3 = [];

let i = 0;

while (i < populations.length) {
  percentages3.push(percentageOfWorld1(populations[i]));
  i++;
}

console.log(percentages);
console.log(percentages3);
