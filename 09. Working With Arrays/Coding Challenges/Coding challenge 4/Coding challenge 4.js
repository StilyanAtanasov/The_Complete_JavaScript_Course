"use strict";

// ----- Coding Challenge #4 -----

// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion.

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little.
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

// TEST DATA:
// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] }
// ];

const dogs = [
  { weight: 22, curFood: 250, owners: [`Alice`, `Bob`] },
  { weight: 8, curFood: 200, owners: [`Matilda`] },
  { weight: 13, curFood: 275, owners: [`Sarah`, `John`] },
  { weight: 32, curFood: 340, owners: [`Michael`] },
];

// --- 1 ---
dogs.forEach(dog => (dog.recommendedFood = dog.weight ** 0.75 * 28));

// --- 2 ---
const dogSarah = dogs.find(dog => dog.owners.includes(`Sarah`));
console.log(`Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recommendedFood ? `much` : `little`} `);

// --- 3 ---
const { much: ownersEatTooMuch, little: ownersEatTooLittle } = dogs.reduce(
  (obj, dog) => {
    dog.curFood > dog.recommendedFood ? obj.much.push(...dog.owners) : obj.little.push(...dog.owners);
    return obj;
  },
  { much: [], little: [] }
);

// --- 4 ---
const logOwnersDogsEatingHabits = (owners, foodGiven) => console.log(`${owners.join(` and `)}'s dogs eat too ${foodGiven}!`);

logOwnersDogsEatingHabits(ownersEatTooMuch, `much`);
logOwnersDogsEatingHabits(ownersEatTooLittle, `little`);

// --- 5 ---
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// --- 6 ---
const IsEatingOkay = dog => dog.recommendedFood * 0.9 < dog.curFood && dog.recommendedFood * 1.1 > dog.curFood;
console.log(dogs.some(IsEatingOkay));

// --- 7 ---
const dogsEatingOkay = dogs.filter(IsEatingOkay);

// --- 8 ---
const dogsSorted = dogs.slice().sort((dog1, dog2) => dog1.recommendedFood - dog2.recommendedFood);
