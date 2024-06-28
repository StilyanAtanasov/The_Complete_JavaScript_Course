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
