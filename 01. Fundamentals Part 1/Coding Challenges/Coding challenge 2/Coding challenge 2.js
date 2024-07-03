// ----- Coding Challenge #2 -----

// Use the BMI example from Challenge #1, and the code you already wrote, and improve it:

// 1. Print a nice output to the console, saying who has the higher BMI. The message can be either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
// 2. Use a template literal to include the BMI values in the outputs. Example: "Mark's BMI (28.3) is higher than John's (23.9)!"

const massMark = 78; // kg
const heightMark = 1.69; // m

const massJohn = 92; // kg
const heightJohn = 1.95; // m

const BMIMark = massMark / (heightMark * heightMark); // Solution checker does not accept the `**` as an operator!
const BMIJohn = massJohn / (heightJohn * heightJohn);

console.log(BMIMark);
console.log(BMIJohn);

const markHigherBMI = BMIMark > BMIJohn;
console.log(markHigherBMI);

if (BMIMark > BMIJohn) console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`);
else console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`);
