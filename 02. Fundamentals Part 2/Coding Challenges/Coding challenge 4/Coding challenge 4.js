'use strict';

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tips = [];
const totals = [];

function calcTip (bill) {
    if (bill >= 50 && bill <= 300) {
        return 0.15 * bill;
    } else {
        return 0.2 * bill;
    }
}

for (let i = 0; i < bills.length; i++) {
    const tip = calcTip(bills[i]);
    const total = tip + bills[i];

    tips.push(tip);
    totals.push(total);
}

console.log(tips);
console.log(totals);

// BONUS 

const arr = [74, 247, 170, 421, 17, 1055, 1400];
let sum = 0;

for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
}

function calcAverage (array, sum) {
    return sum/ array.length;
}

console.log(calcAverage(arr, sum));