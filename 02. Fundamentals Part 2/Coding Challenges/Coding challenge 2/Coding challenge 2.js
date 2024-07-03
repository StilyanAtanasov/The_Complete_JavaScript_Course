"use strict";

const calcTip = (bill) => (bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill);

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

// BONUS
const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
