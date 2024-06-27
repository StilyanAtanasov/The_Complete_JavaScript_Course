// DATA 1

const markWeight1 = 78; //kg
const markHeight1 = 1.69; //m

const johnWeight1 = 92; //kg
const johnHeight1 = 1.95; //m

// DATA 2

const markWeight2 = 95; //kg
const markHeight2 = 1.88; //m

const johnWeight2 = 85; //kg
const johnHeight2 = 1.76; //m

// BMI - DATA 1

const markBMI1 = markWeight1 / markHeight1 ** 2;
const johnBMI1 = johnWeight1 / johnHeight1 ** 2;

// BMI - DATA 2

const markBMI2 = markWeight2 / markHeight2 ** 2;
const johnBMI2 = johnWeight2 / johnHeight2 ** 2;


const markHigherBMI1 = markBMI1 > johnBMI1;
const markHigherBMI2 = markBMI2 > johnBMI2;

console.log(markBMI1);
console.log(johnBMI1);
console.log(markBMI2);
console.log(johnBMI2);
console.log(markHigherBMI1);
console.log(markHigherBMI2);


// TEST WITH DATA 1 BMI

if (markBMI1 > johnBMI1) {
    console.log(`Mark's BMI(${markBMI1}) is higher than John's(${johnBMI1})`)
} else {
    console.log(`John's BMI(${johnBMI1}) is higher than Mark's(${markBMI1})`)
}



// TEST WITH DATA 2 BMI

if (markBMI2 > johnBMI2) {
    console.log(`Mark's BMI(${markBMI2}) is higher than John's(${johnBMI2})`)
} else {
    console.log(`John's BMI(${johnBMI2}) is higher than Mark's(${markBMI2})`)
}
