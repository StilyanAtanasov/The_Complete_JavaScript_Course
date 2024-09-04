"use strict";

// ----- Constants -----
const maxDeposit = 10000;
const minMovementAmount = 5;

// ----- Data -----
const accounts = [
  {
    owner: `Jonas Schmedtmann`,
    username: `JSCHMEDTMANN875392`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 200 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 450 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -400 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 3000 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -650 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -130 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 70 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 1300 },
    ],
    interestRate: 0.012,
    pin: 4758,
  },
  {
    owner: `Jessica Davis`,
    username: `JDAVIS136754`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 5000 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 3400 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -150 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -790 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -3210 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -1000 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 8500 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -30 },
    ],
    interestRate: 0.015,
    pin: 8391,
  },
  {
    owner: `Steven Williams`,
    username: `SWILLIAMS927463`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 200 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -200 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 340 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -300 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -20 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 50 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 400 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -460 },
    ],
    interestRate: 0.007,
    pin: 2847,
  },
  {
    owner: `Sarah Smith`,
    username: `SSMITH234578`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 430 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 1000 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 700 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 50 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 90 },
    ],
    interestRate: 0.01,
    pin: 9432,
  },
  {
    owner: `Stilyan Atanasov`,
    username: `SATANASOV578932`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 1000 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 12000 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -5000 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 10000 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -84 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 750 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 154 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 1478 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -747 },
    ],
    interestRate: 0.01,
    pin: 6743,
  },
  {
    owner: `Antoan Atanasov`,
    username: `AATANASOV489562`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 1000 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 12000 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -5000 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 10000 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -84 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 750 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 154 },
      { type: `deposit`, description: `Online Deposit`, date: `24/01/2037`, amount: 1478 },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `24/01/2037`, amount: -747 },
    ],
    interestRate: 0.01,
    pin: 9583,
  },
];

const operations = {
  deposit: `deposit`,
  withdraw: `withdraw`,
  transfer: `transfer`,
};

const messages = {
  errors: {
    invalidAmount: {
      negativeValue: operation => `Cannot ${operation} non-positive amount!`,
      insufficientBalance: () => `Insufficient balance!`,
      movementLimit: (operation, limit = maxDeposit) => `Cannot ${operation} more than ${limit}€ at once!`,
      movementMin: (operation, min = minMovementAmount) => `Cannot ${operation} less than ${min}€!`,
    },
    invalidCredentials: {
      selfTransfer: () => `Cannot transfer to yourself!`,
      username: username => `Account with username: ${username} does not exist!`,
      credentials: () => `Invalid credentials!`,
    },
  },

  popup: {
    closeAccount: () => `closure of your account`,
    deposit: amount => `deposit of ${amount}€`,
    withdraw: amount => `withdrawal of ${amount}€`,
    transfer: (recipient, amount) => `transfer of ${amount}€ to ${recipient}`,
    builtMessage: operationInfo => `Please confirm that you wish to proceed with the ${operationInfo}?`,
  },

  welcome(name) {
    return `Welcome, ${name}!`;
  },
};

const themes = {
  bright: {
    icon: `Theme: <i class="fa-regular fa-brightness" />`,
    backgroundColor: `#f8f6f6`,
    movementsBackgroundColor: `#ffffff`,
    color: `#444`,
    faderTop: `linear-gradient(to top, #ffffff00, #ffffff)`,
    faderBottom: `linear-gradient(to bottom, #ffffff00, #ffffff)`,
    logoSrc: `logo-dark.png`,
  },
  dark: {
    icon: `Theme: <i class="fa-regular fa-moon" />`,
    backgroundColor: `#1b1b1b`,
    movementsBackgroundColor: `#292929`,
    color: `#f8f6f6`,
    faderTop: `linear-gradient(to top, #ffffff00, #292929)`,
    faderBottom: `linear-gradient(to bottom, #ffffff00, #292929)`,
    logoSrc: `logo-bright.png`,
  },
};

const sortFunctions = new Map([
  [
    0,
    {
      sortFunction: `none`,
      btnInnerHTML: `<i class="fa-solid fa-arrow-up-arrow-down"></i>`,
    },
  ],
  [
    1, // Ascending
    {
      sortFunction: movements => movements.sort((a, b) => a.amount - b.amount),
      btnInnerHTML: `<i class="fa-solid fa-arrow-up-wide-short" />`,
    },
  ],
  [
    2, // Descending
    {
      sortFunction: movements => movements.sort((a, b) => b.amount - a.amount),
      btnInnerHTML: `<i class="fa-solid fa-arrow-down-short-wide" />`,
    },
  ],
]);

// ----- Global Variables -----
const defaultTheme = themes.bright;
const defaultMovementsSortState = 0;

let currentAccount;
let actionOnConfirm;
let currentMovementsSortState = defaultMovementsSortState;
let currentTheme = defaultTheme;
let popupActive = false;

// ----- Elements -----
const elements = {
  containers: {
    login: document.querySelector(`.login-container`),
    nav: document.querySelector(`.nav`),
    app: document.querySelector(`.app`),
    movements: document.querySelector(`.movements`),
    popup: document.querySelector(`.popup`),
  },
  labels: {
    welcome: document.querySelector(`.welcome`),
    date: document.querySelector(`.date`),
    balance: document.querySelector(`.balance__value`),
    sumIn: document.querySelector(`.summary__value--in`),
    sumOut: document.querySelector(`.summary__value--out`),
    sumInterest: document.querySelector(`.summary__value--interest`),
    timer: document.querySelector(`.timer`),
    popupMessage: document.querySelector(`.popup__message`),
  },
  inputs: {
    loginUsername: document.querySelector(`.login__input--user`),
    loginPin: document.querySelector(`.login__input--pin`),
    transferTo: document.querySelector(`.form__input--to`),
    transferAmount: document.querySelector(`.form__input--amount`),
    depositAmount: document.querySelector(`.form__input--deposit-amount`),
    withdrawalAmount: document.querySelector(`.form__input--withdrawal-amount`),
    closeUsername: document.querySelector(`.form__input--user`),
    closePin: document.querySelector(`.form__input--pin`),
  },
  buttons: {
    login: document.querySelector(`.btn--login`),
    logout: document.querySelector(`.btn--logout`),
    transfer: document.querySelector(`.form__btn--transfer`),
    deposit: document.querySelector(`.form__btn--deposit`),
    withdraw: document.querySelector(`.form__btn--withdraw`),
    close: document.querySelector(`.form__btn--close`),
    sort: document.querySelector(`.btn--sort`),
    theme: document.querySelector(`.theme`),
    settings: document.querySelector(`.settings`),
    settingsMenu: document.querySelector(`.settings--menu`),
    popupConfirm: document.querySelector(`.popup__btn--confirm`),
    popupCancel: document.querySelector(`.popup__btn--cancel`),
    popupClose: document.querySelector(`.popup__btn--close`),
  },
  other: {
    logo: document.querySelector(`.logo`),
    faderTop: document.querySelector(`.fader--top`),
    faderBottom: document.querySelector(`.fader--bottom`),
    sortIcon: document.querySelector(`.sort--icon`),
    overlay: document.querySelector(`.overlay`),
  },
};

// ----- Functions -----
const updateAccountBalance = account => (account.balance = calcBalance(account));
const calcBalance = account => account.movements.reduce((acc, mov) => acc + mov.amount, 0);
const displayBalance = balance => (elements.labels.balance.textContent = `${balance} €`);
const calcIn = account => account.movements.reduce((acc, mov) => (mov.amount > 0 ? acc + mov.amount : acc), 0);
const displayIn = sumIn => (elements.labels.sumIn.textContent = `${Math.round(sumIn * 100) / 100} €`);
const calcOut = account => account.movements.reduce((acc, mov) => (mov.amount < 0 ? acc + mov.amount : acc), 0);
const displayOut = sumOut => (elements.labels.sumOut.textContent = `${Math.abs(Math.round(sumOut * 100) / 100)} €`);
const calcInterest = (P, R, T = 1) => P * R * T;
const displayInterest = interest => (elements.labels.sumInterest.textContent = `${Math.round(interest * 100) / 100} €`);
const validateCredentials = (username, password) => (accounts.find(acc => acc.username === username && acc.pin === password) !== undefined ? true : false);
const clearFields = (...fieldNames) => fieldNames.forEach(f => (elements.inputs[f].value = ``));
const buildMovement = (type, description, date, amount) => ({ type, description, date, amount });
const buildDeposit = buildMovement.bind(null, `deposit`);
const buildOnlineDeposit = buildMovement.bind(null, `deposit`, `Online Deposit`);
const buildATMWithdrawal = buildMovement.bind(null, `withdrawal`, `ATM Withdrawal`);
const buildWireTransfer = buildMovement.bind(null, `transfer`);
const emptyMovementsContainer = () => document.querySelectorAll(".movements__row").forEach(row => row.remove());
const swapTheme = () => (currentTheme = currentTheme === themes.bright ? themes.dark : themes.bright);
const closeConfirmation = () => elements.buttons.popupConfirm.removeEventListener(`click`, actionOnConfirm);

function handleLoginUI() {
  elements.containers.login.classList.add(`hidden`);
  elements.containers.app.classList.remove(`hidden`);
  elements.containers.nav.classList.remove(`hidden`);
  elements.labels.welcome.textContent = messages.welcome(currentAccount.owner.split(` `)[0]);
}

function handleLogOutUI() {
  emptyMovementsContainer();
  elements.containers.app.classList.add(`hidden`);
  elements.containers.nav.classList.add(`hidden`);
  elements.containers.login.classList.remove(`hidden`);
  elements.labels.welcome.textContent = ``;
  currentMovementsSortState = defaultMovementsSortState;
  currentTheme = defaultTheme;
  changeTheme(currentTheme);
}

function displayMovements(movements) {
  emptyMovementsContainer();

  movements.forEach(function (movement) {
    const movementType = movement.type;
    const movementHTML = `<div class="movements__row">
                            <div class="movements__type ${movementType}">${movementType}</div>
                            <div class="movements__description">${movement.description}</div>
                            <div class="movements__date">${movement.date}</div>
                            <div class="movements__value">${movement.amount} €</div>
                          </div>`;

    elements.other.faderTop.insertAdjacentHTML(`afterend`, movementHTML);
  });
}

function sortMovements(movements, sortFunction = sortFunctions.get(0).sortFunction) {
  elements.other.sortIcon.innerHTML = sortFunctions.get(currentMovementsSortState).btnInnerHTML;
  if (sortFunction === sortFunctions.get(0).sortFunction) return movements;

  return sortFunction(movements.slice());
}

function login(e) {
  e.preventDefault();
  const username = elements.inputs.loginUsername.value;
  const password = Number(elements.inputs.loginPin.value);

  if (!validateCredentials(username, password)) return;

  currentAccount = accounts.find(acc => acc.username === username);
  clearFields(`loginUsername`, `loginPin`);
  handleLoginUI();
  updateAccountBalance(currentAccount);
  updateUI(currentAccount);
}

function validateDeposit() {
  const input1 = elements.inputs.depositAmount.value;
  if (input1 === ``) return;
  const amount = Number(input1);

  if (amount <= 0) return error(messages.errors.invalidAmount.negativeValue(operations.deposit));
  if (amount < minMovementAmount) return error(messages.errors.invalidAmount.movementMin(operations.deposit));
  if (amount > maxDeposit) return error(messages.errors.invalidAmount.movementLimit(operations.deposit));

  displayPopup(messages.popup.builtMessage(messages.popup.deposit(amount)));
  actionOnConfirm = () => deposit(amount);
  elements.buttons.popupConfirm.addEventListener(`click`, actionOnConfirm);
}

function deposit(amount) {
  currentAccount.movements.push(buildOnlineDeposit(`24/01/2037`, amount));
  updateAccountBalance(currentAccount);
  updateUI(currentAccount);
  hidePopup();
}

function validateWithdrawal() {
  const input1 = elements.inputs.withdrawalAmount.value;
  if (input1 === ``) return;

  const amount = Number(input1);
  if (amount <= 0) return error(messages.errors.invalidAmount.negativeValue(operations.withdraw));
  if (amount < minMovementAmount) return error(messages.errors.invalidAmount.movementMin(operations.withdraw));
  if (amount > currentAccount.balance) return error(messages.errors.invalidAmount.insufficientBalance());

  displayPopup(messages.popup.builtMessage(messages.popup.withdraw(amount)));
  actionOnConfirm = () => withdraw(amount);
  elements.buttons.popupConfirm.addEventListener(`click`, actionOnConfirm);
}

function withdraw(amount) {
  currentAccount.movements.push(buildATMWithdrawal(`24/01/2037`, amount * -1));
  updateAccountBalance(currentAccount);
  updateUI(currentAccount);
  hidePopup();
}

function validateTransfer() {
  const input1 = elements.inputs.transferTo.value;
  const input2 = elements.inputs.transferAmount.value;
  if (input1 === `` || input2 === ``) return;

  const recipient = input1;
  const amount = Number(input2);

  if (recipient === currentAccount.username) return error(messages.errors.invalidCredentials.selfTransfer());
  if (amount <= 0) return error(messages.errors.invalidAmount.negativeValue(operations.transfer));
  if (amount < minMovementAmount) return error(messages.errors.invalidAmount.movementMin(operations.transfer));
  if (amount > maxDeposit) return error(messages.errors.invalidAmount.movementLimit(operations.transfer));
  if (amount > currentAccount.balance) return error(messages.errors.invalidAmount.insufficientBalance());

  const recipientIndex = accounts.findIndex(acc => acc.username === recipient);
  if (recipientIndex === -1) return error(messages.errors.invalidCredentials.username(recipient));

  displayPopup(messages.popup.builtMessage(messages.popup.transfer(accounts[recipientIndex].owner, amount)));
  actionOnConfirm = () => transfer(recipientIndex, amount);
  elements.buttons.popupConfirm.addEventListener(`click`, actionOnConfirm);
}

function transfer(recipientIndex, amount) {
  currentAccount.movements.push(buildWireTransfer(`Wire transfer to ${accounts[recipientIndex].owner}`, `24/01/2037`, amount * -1));
  accounts[recipientIndex].movements.push(buildDeposit(`Wire transfer from ${currentAccount.owner}`, `24/01/2037`, amount));
  updateAccountBalance(currentAccount);
  updateUI(currentAccount);
  hidePopup();
}

function validateAccountClosure() {
  const input1 = elements.inputs.closeUsername.value;
  const input2 = elements.inputs.closePin.value;
  if (input1 === `` || input2 === ``) return;

  const username = input1;
  const password = Number(input2);

  if (username !== currentAccount.username || password !== currentAccount.pin) return error(messages.errors.invalidCredentials.credentials());

  displayPopup(messages.popup.builtMessage(messages.popup.closeAccount()));
  actionOnConfirm = () => closeAccount();
  elements.buttons.popupConfirm.addEventListener(`click`, actionOnConfirm);
}

function closeAccount() {
  accounts.splice(accounts.indexOf(currentAccount), 1);
  handleLogOutUI();
  hidePopup();
}

function updateUI(account) {
  displayMovements(account.movements);
  displayBalance(account.balance);
  displayIn(calcIn(account));
  displayOut(calcOut(account));
  displayInterest(calcInterest(account.balance, account.interestRate));
}

function changeTheme(theme) {
  elements.buttons.theme.innerHTML = theme.icon;
  document.body.style.backgroundColor = theme.backgroundColor;
  document.body.style.color = theme.color;
  elements.containers.movements.style.backgroundColor = theme.movementsBackgroundColor;
  elements.other.faderTop.style.backgroundImage = theme.faderTop;
  elements.other.faderBottom.style.backgroundImage = theme.faderBottom;
  elements.buttons.sort.style.color = theme.color;
  elements.other.logo.src = theme.logoSrc;
  elements.buttons.settings.style.color = theme.color;
}

function displayPopup(message) {
  elements.labels.popupMessage.textContent = message;
  elements.other.overlay.classList.remove(`hidden`);
  elements.containers.popup.classList.remove(`hidden`);
  popupActive = true;
}

function hidePopup() {
  elements.other.overlay.classList.add(`hidden`);
  elements.containers.popup.classList.add(`hidden`);
  elements.containers.popup.classList.remove(`error`);
  elements.buttons.popupConfirm.textContent = `Confirm`;
  popupActive = false;
  closeConfirmation();
}

function error(error) {
  displayPopup(`Error: ${error}`);
  elements.containers.popup.classList.add(`error`);
  elements.buttons.popupConfirm.textContent = `OK`;
  actionOnConfirm = () => hidePopup();
  elements.buttons.popupConfirm.addEventListener(`click`, actionOnConfirm);
}

// ----- App Logic -----

// ----- Event Listeners -----
elements.buttons.login.addEventListener(`click`, login);
document.addEventListener(`keydown`, e => e.key === `Enter` && currentAccount === undefined && login(e));
elements.buttons.deposit.addEventListener(`click`, validateDeposit);
elements.buttons.withdraw.addEventListener(`click`, validateWithdrawal);
elements.buttons.transfer.addEventListener(`click`, validateTransfer);
elements.buttons.close.addEventListener(`click`, validateAccountClosure);
elements.buttons.theme.addEventListener(`click`, () => changeTheme(swapTheme()));
elements.buttons.sort.addEventListener(`click`, () =>
  displayMovements(sortMovements(currentAccount.movements, sortFunctions.get(currentMovementsSortState === 2 ? (currentMovementsSortState = 0) : ++currentMovementsSortState).sortFunction))
);
elements.buttons.settings.addEventListener(`mouseover`, () => elements.buttons.settingsMenu.classList.remove(`hide--right`));
elements.buttons.settings.addEventListener(`mouseout`, () => elements.buttons.settingsMenu.classList.add(`hide--right`));
elements.buttons.settingsMenu.addEventListener("mouseenter", () => elements.buttons.settingsMenu.classList.remove("hide--right"));
elements.buttons.settingsMenu.addEventListener("mouseleave", () => elements.buttons.settingsMenu.classList.add("hide--right"));
elements.buttons.logout.addEventListener(`click`, handleLogOutUI);
elements.buttons.popupCancel.addEventListener(`click`, hidePopup);
elements.buttons.popupClose.addEventListener(`click`, hidePopup);
elements.other.overlay.addEventListener(`click`, hidePopup);
document.addEventListener(`keydown`, e => e.key === `Escape` && popupActive && hidePopup());
document.addEventListener(`keydown`, e => e.key === `Enter` && popupActive && actionOnConfirm());

// TODO Toggle, prevent default operations, simplify operations, add errors, sign up
