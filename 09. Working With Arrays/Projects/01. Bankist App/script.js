"use strict";

// ----- Data -----
const accounts = [
  {
    owner: `Jonas Schmedtmann`,
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  },
  {
    owner: `Jessica Davis`,
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  },
  {
    owner: `Steven Thomas Williams`,
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  },
  {
    owner: `Sarah Smith`,
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  },
];

// ----- Elements -----
const elements = {
  containers: {
    app: document.querySelector(`.app`),
    movements: document.querySelector(`.movements`),
  },
  labels: {
    welcome: document.querySelector(`.welcome`),
    date: document.querySelector(`.date`),
    balance: document.querySelector(`.balance__value`),
    sumIn: document.querySelector(`.summary__value--in`),
    sumOut: document.querySelector(`.summary__value--out`),
    sumInterest: document.querySelector(`.summary__value--interest`),
    timer: document.querySelector(`.timer`),
  },
  inputs: {
    loginUsername: document.querySelector(`.login__input--user`),
    loginPin: document.querySelector(`.login__input--pin`),
    transferTo: document.querySelector(`.form__input--to`),
    transferAmount: document.querySelector(`.form__input--amount`),
    loanAmount: document.querySelector(`.form__input--loan-amount`),
    closeUsername: document.querySelector(`.form__input--user`),
    closePin: document.querySelector(`.form__input--pin`),
  },
  buttons: {
    login: document.querySelector(`.login__btn`),
    transfer: document.querySelector(`.form__btn--transfer`),
    loan: document.querySelector(`.form__btn--loan`),
    close: document.querySelector(`.form__btn--close`),
    sort: document.querySelector(`.btn--sort`),
  },
};

// ----- Functions -----
function displayMovements(movements) {
  elements.containers.movements.innerHTML = ``;

  movements.forEach(function (movement, i) {
    const movementType = movement > 0 ? `deposit` : `withdrawal`;
    const htmlEl = `<div class="movements__row">
                  <div class="movements__type ${movementType}">${i + 1} ${movementType}</div>
                  <div class="movements__value">${movement}</div>
               </div>`;

    elements.containers.movements.insertAdjacentHTML(`afterbegin`, htmlEl);
  });
}

// ----- App Logic -----
displayMovements(accounts[0].movements);
