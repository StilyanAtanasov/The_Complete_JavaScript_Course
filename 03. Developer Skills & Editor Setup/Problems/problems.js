"use strict";

// ----- Using Google, StackOverflow and MDN -----

// --- PROBLEM 1: ---
// We work for a company building a smart home thermometer.
// Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude.
// Keep in mind that sometimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// - What is temp amplitude? Answer: difference between highest and lowest temp
// - How to compute max and min temperatures?
// - What's a sensor error?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it

function findTempAmplitude(tempsArr) {
  if (tempsArr.length === 0) return;

  let startingIndex = 0;
  while (typeof tempsArr[startingIndex] !== "number") {
    if (tempsArr.length - 1 === startingIndex) return "Only errors found!";
    startingIndex++;
  }

  let minTemp = tempsArr[startingIndex];
  let maxTemp = tempsArr[startingIndex];

  for (let index = startingIndex; index < tempsArr.length; index++) {
    const current = tempsArr[index];

    if (typeof current === "number") {
      if (current < minTemp) minTemp = current;
      if (current > maxTemp) maxTemp = current;
    }
  }

  return maxTemp - minTemp;
}

console.log(findTempAmplitude(temperatures));

// --- PROBLEM 2: ---
// Function should now receive 2 arrays of temps

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice? NO! Just merge two arrays

// 2) Breaking up into sub-problems
// - Merge 2 arrays

function findTempAmplitudeWith2Arrays(tempsArr1, tempsArr2) {
  const tempsArr = tempsArr1.concat(tempsArr2);

  if (tempsArr.length === 0) return;

  let startingIndex = 0;
  while (typeof tempsArr[startingIndex] !== "number") {
    if (tempsArr.length - 1 === startingIndex) return "Only errors found!";
    startingIndex++;
  }

  let minTemp = tempsArr[startingIndex];
  let maxTemp = tempsArr[startingIndex];

  for (let index = startingIndex; index < tempsArr.length; index++) {
    const current = tempsArr[index];

    if (typeof current === "number") {
      if (current < minTemp) minTemp = current;
      if (current > maxTemp) maxTemp = current;
    }
  }

  return maxTemp - minTemp;
}

console.log(findTempAmplitudeWith2Arrays([3, 5, 1], [9, 0, 5]));
