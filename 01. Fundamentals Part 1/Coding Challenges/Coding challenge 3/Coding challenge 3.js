// MAIN TASK

console.log(`Main`);

const mainFirstScoreDolphins = 96;
const mainSecondScoreDolphins = 108;
const mainThirdScoreDolphins = 89;
const mainFirstScoreKoalas = 88;
const mainSecondScoreKoalas = 91;
const mainThirdScoreKoalas = 110;

const mainAverageScoreDolphins = (mainFirstScoreDolphins + mainSecondScoreDolphins + mainThirdScoreDolphins) / 3;
const mainAverageScoreKoalas = (mainFirstScoreKoalas + mainSecondScoreKoalas + mainThirdScoreKoalas) / 3;

console.log(mainAverageScoreDolphins, mainAverageScoreKoalas);

if (mainAverageScoreDolphins > mainAverageScoreKoalas) {
    console.log(`Team Dolphins are the winner!🏆`);
} else if (mainAverageScoreDolphins < mainAverageScoreKoalas){
    console.log(`Team Koalas are the winner!🏆`);
} else {
    console.log(`Equal result! No one is the winner!😞`);
}

console.log(``);

// BONUS 1
console.log(`Bonus 1`);

const bonus1FirstScoreDolphins = 97;
const bonus1SecondScoreDolphins = 112;
const bonus1ThirdScoreDolphins = 101;
const bonus1FirstScoreKoalas = 109;
const bonus1SecondScoreKoalas = 95;
const bonus1ThirdScoreKoalas = 123;

const bonus1AverageScoreDolphins = (bonus1FirstScoreDolphins + bonus1SecondScoreDolphins + bonus1ThirdScoreDolphins) / 3;
const bonus1AverageScoreKoalas = (bonus1FirstScoreKoalas + bonus1SecondScoreKoalas + bonus1ThirdScoreKoalas) / 3;

console.log(bonus1AverageScoreDolphins, bonus1AverageScoreKoalas);

if (bonus1AverageScoreDolphins > bonus1AverageScoreKoalas && bonus1AverageScoreDolphins >= 100) {
    console.log(`Team Dolphins are the winner!🏆`);
} else if (bonus1AverageScoreDolphins < bonus1AverageScoreKoalas && bonus1AverageScoreKoalas >= 100){
    console.log(`Team Koalas are the winner!🏆`);
} else if (bonus1AverageScoreDolphins === bonus1AverageScoreKoalas){
    console.log(`Equal result! No one is the winner!😞`);
} else {
    console.log(`No one is the winner! Results are under the limit of 100 poins!😞`)
}

console.log(``);

// BONUS 2

console.log(`Bonus 2`);

const bonus2FirstScoreDolphins = 97;
const bonus2SecondScoreDolphins = 112;
const bonus2ThirdScoreDolphins = 101;
const bonus2FirstScoreKoalas = 109;
const bonus2SecondScoreKoalas = 95;
const bonus2ThirdScoreKoalas = 106;

const bonus2AverageScoreDolphins = (bonus2FirstScoreDolphins + bonus2SecondScoreDolphins + bonus2ThirdScoreDolphins) / 3;
const bonus2AverageScoreKoalas = (bonus2FirstScoreKoalas + bonus2SecondScoreKoalas + bonus2ThirdScoreKoalas) / 3;

console.log(bonus2AverageScoreDolphins, bonus2AverageScoreKoalas)

if (bonus2AverageScoreDolphins > bonus2AverageScoreKoalas && bonus2AverageScoreDolphins >= 100) {
    console.log(`Team Dolphins are the winner!🏆`);
} else if (bonus2AverageScoreDolphins < bonus2AverageScoreKoalas && bonus2AverageScoreKoalas >= 100){
    console.log(`Team Koalas are the winner!🏆`);
} else if (bonus2AverageScoreDolphins === bonus2AverageScoreKoalas && (bonus2AverageScoreKoalas > 100 && bonus2AverageScoreDolphins > 100)){
    console.log(`Equal result! The both teams win a trophy!🏆🏆`);
} else {
    console.log(`No one is the winner! Results are under the limit of 100 poins!😞`);
}

console.log(``);
