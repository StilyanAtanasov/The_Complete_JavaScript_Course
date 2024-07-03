"use strict";

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tips = [];
const totals = [];

const calcTip = (bill) => (bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill);

for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(bills[i] + tips[i]);
}

// BONUS
function calcAverage(arr) {
  if (arr.length === 0) return;

  let sum = 0;
  for (let index = 0; index < arr.length; index++) sum += arr[index];

  return sum / arr.length;
}

calcAverage(totals); // 275.19
