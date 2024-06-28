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
