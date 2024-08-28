"use strict";

// ----- Global Variables -----
let currentAccount;

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
  login: `Log in to get started`,
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
const updateAccountBalance = account => (account.balance = calcBalance(account));
const calcBalance = account => account.movements.reduce((acc, mov) => acc + mov, 0);
const displayBalance = balance => (elements.labels.balance.textContent = `${balance} €`);
const calcIn = account => account.movements.reduce((acc, mov) => (mov > 0 ? acc + mov : acc), 0);
const displayIn = sumIn => (elements.labels.sumIn.textContent = `${sumIn} €`);
const calcOut = account => account.movements.reduce((acc, mov) => (mov < 0 ? acc + mov : acc), 0);
const displayOut = sumOut => (elements.labels.sumOut.textContent = `${Math.abs(sumOut)} €`);
const calcInterest = (P, R, T = 1) => P * R * T;
const displayInterest = interest => (elements.labels.sumInterest.textContent = `${interest} €`);
const validateCredentials = (username, password) => (accounts.find(acc => acc.username === username && acc.pin === password) !== undefined ? true : false);

function handleLoginUI() {
  elements.containers.app.classList.remove(`hidden`);
  elements.labels.welcome.textContent = messages.welcome(currentAccount.owner.split(` `)[0]);
}

function handleLogOutUI() {
  elements.containers.movements.innerHTML = ``;
  elements.containers.app.classList.add(`hidden`);
  elements.labels.welcome.textContent = messages.login;
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

function sortMovements(movements) {
  elements.containers.movements.innerHTML = ``;
}

function login() {
  debugger;
  const username = elements.inputs.loginUsername.value;
  const password = Number(elements.inputs.loginPin.value);

  if (!validateCredentials(username, password)) return;

  currentAccount = accounts.find(acc => acc.username === username);
  handleLoginUI();
  updateAccountBalance(currentAccount);
  updateUI(currentAccount);
}

function deposit() {
  const amount = Number(elements.inputs.depositAmount.value);
  if (amount <= 0) return;

  currentAccount.movements.push(amount);
  updateAccountBalance(currentAccount);
  updateUI(currentAccount);
}

function tranfer() {
  const recipient = elements.inputs.transferTo.value;
  const amount = Number(elements.inputs.transferAmount.value);

  const recipientIndex = accounts.findIndex(acc => acc.username === recipient);
  if (amount <= 0 || recipient === currentAccount.username || recipientIndex === -1) return;

  currentAccount.movements.push(-1 * amount);
  accounts[recipientIndex].movements.push(amount);
  updateAccountBalance(currentAccount);
  updateUI(currentAccount);
}

function closeAccount() {
  const username = elements.inputs.closeUsername.value;
  const password = Number(elements.inputs.closePin.value);

  if (username !== currentAccount.username || password !== currentAccount.pin) return;

  accounts.splice(accounts.indexOf(currentAccount), 1);
  handleLogOutUI();
}

function updateUI(account) {
  displayMovements(account.movements);
  displayBalance(account.balance);
  displayIn(calcIn(account));
  displayOut(calcOut(account));
  displayInterest(calcInterest(account.balance, account.interestRate));
}

// ----- App Logic -----

// ----- Event Listeners -----
elements.buttons.login.addEventListener(`click`, login);
elements.buttons.deposit.addEventListener(`click`, deposit);
elements.buttons.transfer.addEventListener(`click`, tranfer);
elements.buttons.close.addEventListener(`click`, closeAccount);
