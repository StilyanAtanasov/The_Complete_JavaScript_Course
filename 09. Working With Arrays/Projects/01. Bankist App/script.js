"use strict";

// ----- Global Variables -----
let currentAccountIndex;

// ----- Data -----
const accounts = [
  {
    owner: `Jonas Schmedtmann`,
    username: `JSCHMEDTMANN875392`,
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 0.012,
    pin: 1111,
  },
  {
    owner: `Jessica Davis`,
    username: `JDAVIS136754`,
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 0.015,
    pin: 2222,
  },
  {
    owner: `Steven Williams`,
    username: `SWILLIAMS927463`,
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.007,
    pin: 3333,
  },
  {
    owner: `Sarah Smith`,
    username: `SSMITH234578`,
    movements: [430, 1000, 700, 50, 90],
    interestRate: 0.01,
    pin: 4444,
  },
  {
    owner: `Stilyan Atanasov`,
    username: `SATANASOV578932`,
    movements: [1000, 12000, -5000, 10000, -84, 750, 154, 1478, -747],
    interestRate: 0.01,
    pin: 5555,
  },
  {
    owner: `Antoan Atanasov`,
    username: `AATANASOV489562`,
    movements: [1000, 12000, -5000, 10000, -84, 750, 154, 1478, -747],
    interestRate: 0.01,
    pin: 6666,
  },
];

const messages = {
  welcome(name) {
    return `Good Day, ${name}!`;
  },
};

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
    depositAmount: document.querySelector(`.form__input--deposit-amount`),
    closeUsername: document.querySelector(`.form__input--user`),
    closePin: document.querySelector(`.form__input--pin`),
  },
  buttons: {
    login: document.querySelector(`.login__btn`),
    transfer: document.querySelector(`.form__btn--transfer`),
    deposit: document.querySelector(`.form__btn--deposit`),
    close: document.querySelector(`.form__btn--close`),
    sort: document.querySelector(`.btn--sort`),
  },
};

// ----- Functions -----
const updateAccountBalance = account => (accounts[account].balance = calcBalance(account));
const calcBalance = account => accounts[account].movements.reduce((acc, mov) => acc + mov, 0);
const displayBalance = balance => (elements.labels.balance.textContent = `${balance} €`);
const calcIn = account => accounts[account].movements.reduce((acc, mov) => (mov > 0 ? acc + mov : acc), 0);
const displayIn = sumIn => (elements.labels.sumIn.textContent = `${sumIn} €`);
const calcOut = account => accounts[account].movements.reduce((acc, mov) => (mov < 0 ? acc + mov : acc), 0);
const displayOut = sumOut => (elements.labels.sumOut.textContent = `${Math.abs(sumOut)} €`);
const calcInterest = (P, R, T = 1) => P * R * T;
const displayInterest = interest => (elements.labels.sumInterest.textContent = `${interest} €`);

function handleLoginUI() {
  elements.containers.app.classList.remove(`hidden`);
  elements.labels.welcome.textContent = messages.welcome(accounts[currentAccountIndex].owner.split(` `)[0]);
}

function displayMovements(movements) {
  elements.containers.movements.innerHTML = ``;

  movements.forEach(function (movement, i) {
    const movementType = movement > 0 ? `deposit` : `withdrawal`;
    const htmlEl = `<div class="movements__row">
                      <div class="movements__type ${movementType}">${i + 1} ${movementType}</div>
                      <div class="movements__value">${movement} €</div>
                    </div>`;

    elements.containers.movements.insertAdjacentHTML(`afterbegin`, htmlEl);
  });
}

function login() {
  const username = elements.inputs.loginUsername.value;
  const password = Number(elements.inputs.loginPin.value);

  if (accounts.filter(acc => acc.username === username && acc.pin === password).length != 1) return;

  currentAccountIndex = accounts.findIndex(acc => acc.username === username);
  handleLoginUI();
  updateAccountBalance(currentAccountIndex);
  updateUI(currentAccountIndex);
}

function deposit() {
  const amount = Number(elements.inputs.depositAmount.value);
  if (amount <= 0) return;

  accounts[currentAccountIndex].movements.push(amount);
  updateAccountBalance(currentAccountIndex);
  updateUI(currentAccountIndex);
}

function tranfer() {
  const recipient = elements.inputs.transferTo.value;
  const amount = Number(elements.inputs.transferAmount.value);

  const recipientIndex = accounts.findIndex(acc => acc.username === recipient);
  if (amount <= 0 || recipient === accounts[currentAccountIndex].username || recipientIndex === -1) return;

  accounts[currentAccountIndex].movements.push(-1 * amount);
  accounts[recipientIndex].movements.push(amount);
  updateAccountBalance(currentAccountIndex);
  updateUI(currentAccountIndex);
}

function updateUI(accountIndex) {
  const account = accounts[accountIndex];

  displayMovements(account.movements);
  displayBalance(account.balance);
  displayIn(calcIn(accountIndex));
  displayOut(calcOut(accountIndex));
  displayInterest(calcInterest(account.balance, account.interestRate));
}

// ----- App Logic -----

// ----- Event Listeners -----
elements.buttons.login.addEventListener(`click`, login);
elements.buttons.deposit.addEventListener(`click`, deposit);
elements.buttons.transfer.addEventListener(`click`, tranfer);
