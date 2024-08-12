"use strict";

// ----- Coding Challenge 4 -----

// Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
// The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

// THIS TEST DATA (pasted to textarea)
/*
 underscore_case
 first_name
 Some_Variable
 calculate_AGE
 delayed_departure
 */

// SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calculateAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅

// Provided code
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

document.querySelector(`button`).addEventListener(`click`, function () {
  const inputText = document.querySelector(`textarea`).value.toLowerCase().split(`\n`);
  for (let i = 0; i < inputText.length; i++) {
    const wordComponents = inputText[i].trim().split(`_`);

    let camelCaseWord = wordComponents[0];
    for (let j = 1; j < wordComponents.length; j++) camelCaseWord += wordComponents[j][0].toUpperCase() + wordComponents[j].slice(1);

    console.log(camelCaseWord.padEnd(20, ` `) + `✅`.repeat(i + 1));
  }
});
