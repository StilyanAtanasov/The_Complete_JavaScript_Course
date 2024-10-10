"use strict";

// ----- Constants -----
const maxDeposit = 10000;
const minMovementAmount = 5;

const themes = {
  bright: {
    icon: `Theme: <i class="fa-regular fa-brightness"></i>`,
    backgroundColor: `#f8f6f6`,
    movementsBackgroundColor: `#ffffff`,
    popupBackgroundColor: ` #f8f6f6`,
    color: `#444`,
    faderTop: `linear-gradient(to top, #ffffff00, #ffffff)`,
    faderBottom: `linear-gradient(to bottom, #ffffff00, #ffffff)`,
    logoSrc: `assets/images/logo-dark.png`,
    settingsMenuBackgroundColor: `#f8f6f6`,
  },
  dark: {
    icon: `Theme: <i class="fa-regular fa-moon"></i>`,
    backgroundColor: `#1b1b1b`,
    movementsBackgroundColor: `#292929`,
    popupBackgroundColor: ` #222`,
    color: `#f8f6f6`,
    faderTop: `linear-gradient(to top, #ffffff00, #292929)`,
    faderBottom: `linear-gradient(to bottom, #ffffff00, #292929)`,
    logoSrc: `assets/images/logo-bright.png`,
    settingsMenuBackgroundColor: ` #222`,
  },
};

// ----- Data -----
const accounts = [
  {
    owner: `Jonas Schmedtmann`,
    username: `JSCHMEDTMANN000001`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, amount: 200 },
      { type: `deposit`, description: `Online Deposit`, amount: 450 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -400 },
      { type: `deposit`, description: `Online Deposit`, amount: 3000 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -650 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -130 },
      { type: `deposit`, description: `Online Deposit`, amount: 70 },
      { type: `deposit`, description: `Online Deposit`, amount: 1300 },
    ],
    interestRate: 0.012,
    pin: 4758,
    theme: themes.dark,
    firstVisit: false,
  },
  {
    owner: `Jessica Davis`,
    username: `JDAVIS000001`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, amount: 5000 },
      { type: `deposit`, description: `Online Deposit`, amount: 3400 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -150 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -790 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -3210 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -1000 },
      { type: `deposit`, description: `Online Deposit`, amount: 8500 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -30 },
    ],
    interestRate: 0.015,
    pin: 8391,
    theme: themes.bright,
    firstVisit: false,
  },
  {
    owner: `Steven Williams`,
    username: `SWILLIAMS000001`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, amount: 200 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -200 },
      { type: `deposit`, description: `Online Deposit`, amount: 340 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -300 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -20 },
      { type: `deposit`, description: `Online Deposit`, amount: 50 },
      { type: `deposit`, description: `Online Deposit`, amount: 400 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -460 },
    ],
    interestRate: 0.007,
    pin: 2847,
    theme: themes.bright,
    firstVisit: false,
  },
  {
    owner: `Sarah Smith`,
    username: `SSMITH000001`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, amount: 430 },
      { type: `deposit`, description: `Online Deposit`, amount: 1000 },
      { type: `deposit`, description: `Online Deposit`, amount: 700 },
      { type: `deposit`, description: `Online Deposit`, amount: 50 },
      { type: `deposit`, description: `Online Deposit`, amount: 90 },
    ],
    interestRate: 0.01,
    pin: 9432,
    theme: themes.bright,
    firstVisit: false,
  },
  {
    owner: `Stilyan Atanasov`,
    username: `SATANASOV000001`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, amount: 1000 },
      { type: `deposit`, description: `Online Deposit`, amount: 12000 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -5000 },
      { type: `deposit`, description: `Online Deposit`, amount: 10000 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -84 },
      { type: `deposit`, description: `Online Deposit`, amount: 750 },
      { type: `deposit`, description: `Online Deposit`, amount: 154 },
      { type: `deposit`, description: `Online Deposit`, amount: 1478 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -747 },
    ],
    interestRate: 0.01,
    pin: 6743,
    theme: themes.dark,
    firstVisit: false,
  },
  {
    owner: `Antoan Atanasov`,
    username: `AATANASOV000001`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, amount: 1000 },
      { type: `deposit`, description: `Online Deposit`, amount: 12000 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -5000 },
      { type: `deposit`, description: `Online Deposit`, amount: 10000 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -84 },
      { type: `deposit`, description: `Online Deposit`, amount: 750 },
      { type: `deposit`, description: `Online Deposit`, amount: 154 },
      { type: `deposit`, description: `Online Deposit`, amount: 1478 },
      { type: `withdrawal`, description: `ATM Withdrawal`, amount: -747 },
    ],
    interestRate: 0.01,
    pin: 9583,
    theme: themes.bright,
    firstVisit: false,
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
      negativeValue: operation => `Error: Cannot ${operation} non-positive amount!`,
      insufficientBalance: () => `Error: Insufficient balance!`,
      movementLimit: (operation, limit = maxDeposit) => `Error: Cannot ${operation} more than ${limit}€ at once!`,
      movementMin: (operation, min = minMovementAmount) => `Error: Cannot ${operation} less than ${min}€!`,
    },
    invalidCredentials: {
      selfTransfer: () => `Error: Cannot transfer to yourself!`,
      username: username => `Error: Account with username: ${username} does not exist!`,
      credentials: () => `Error: Invalid credentials!`,
      wrongCharsInName: () => `Error: Name must be at least 2 characters long and must contain only the letters a-z, A-Z and the "-" sign!`,
      pinCodesNotMatching: () => `Error: PIN codes do not match!`,
      pinCodeSize: () => `Error: PIN code must be 4 digits!`,
      pinCodeInvalidCharachters: () => `Error: PIN code must consist of digits only!`,
    },
  },

  popup: {
    closeAccount: () => `closure of your account`,
    deposit: amount => `deposit of ${amount}€`,
    withdraw: amount => `withdrawal of ${amount}€`,
    transfer: (recipient, amount) => `transfer of ${amount}€ to ${recipient}`,
    builtMessage: operationInfo => `Please confirm that you wish to proceed with the ${operationInfo}?`,
  },

  welcome: name => `Welcome, ${name}!`,
  firstVisit: username =>
    `Your login credentials are as follows: Username: ${username}, and the PIN you just created. Please make sure to write them down securely, as the PIN cannot be recovered! Your username will also be displayed in the navigation.`,
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
      btnInnerHTML: `<i class="fa-solid fa-arrow-up-wide-short"></i>`,
    },
  ],
  [
    2, // Descending
    {
      sortFunction: movements => movements.sort((a, b) => b.amount - a.amount),
      btnInnerHTML: `<i class="fa-solid fa-arrow-down-short-wide"></i>`,
    },
  ],
]);

// ----- Global Variables -----
const defaultTheme = themes.bright;
const defaultMovementsSortState = 0;
const screenWidth = window.innerWidth;
const isMobile = screenWidth <= 800;

let currentAccount;
let actionOnConfirm;
let currentMovementsSortState = defaultMovementsSortState;
let loggingIn = true;
let signingUpStep = 0; // 0 -> not-signing up, 1 -> step 1, 2 -> step 2
let popupActive = false;

// ----- Elements -----
const elements = {
  containers: {
    body: document.querySelector(`.body`),
    login: document.querySelector(`.login-container`),
    nav: document.querySelector(`.nav`),
    app: document.querySelector(`.app`),
    movements: document.querySelector(`.movements`),
    popup: document.querySelector(`.popup`),
    summary: document.querySelector(`.summary`),
    operationBtns: document.querySelector(`.operation--btns`),
  },
  forms: {
    logIn: document.querySelector(`.login-form.login`),
    signUp: document.querySelector(`.login-form.signup`),
    signUpPIN: document.querySelector(`.login-form.pin`),
    deposit: document.querySelector(`.form--deposit`),
    withdraw: document.querySelector(`.form--withdraw`),
    transfer: document.querySelector(`.form--transfer`),
    close: document.querySelector(`.form--close`),
  },
  operations: {
    deposit: document.querySelector(`.operation--deposit`),
    transfer: document.querySelector(`.operation--transfer`),
    close: document.querySelector(`.operation--close`),
  },
  labels: {
    welcome: document.querySelector(`.welcome`),
    username: document.querySelector(`.username`),
    balance: document.querySelector(`.balance__value`),
    sumIn: document.querySelector(`.summary__value--in`),
    sumOut: document.querySelector(`.summary__value--out`),
    sumInterest: document.querySelector(`.summary__value--interest`),
    popupMessage: document.querySelector(`.popup__message`),
    inputErrorLogin: document.querySelector(`.input__error.login`),
    inputErrorSignup: document.querySelector(`.input__error.signup`),
    inputErrorPin: document.querySelector(`.input__error.pin`),
  },
  inputs: {
    login: {
      loginUsername: document.querySelector(`.login__input--user`),
      loginPin: document.querySelector(`.login__input--pin`),
      signUpFirstName: document.querySelector(`.login__input--first-name`),
      signUpLastName: document.querySelector(`.login__input--last-name`),
      signUpPIN: document.querySelector(`.login__input--pin-create`),
      signUpPINConfirm: document.querySelector(`.login__input--pin-confirm`),
    },
    app: {
      transferTo: document.querySelector(`.form__input--to`),
      transferAmount: document.querySelector(`.form__input--amount`),
      depositAmount: document.querySelector(`.form__input--deposit-amount`),
      withdrawalAmount: document.querySelector(`.form__input--withdrawal-amount`),
      closeUsername: document.querySelector(`.form__input--user`),
      closePin: document.querySelector(`.form__input--pin`),
    },
  },
  buttons: {
    login: document.querySelector(`.btn--login`),
    signup: document.querySelector(`.btn--signup`),
    logInPage: document.querySelector(`.btn--login-page`),
    signUpPage: document.querySelector(`.btn--signup-page`),
    signUpNext: document.querySelector(`.btn--signup-next`),
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
    operationDeposit: document.querySelector(`.btn-circle.deposit`),
    operationTransfer: document.querySelector(`.btn-circle.transfer`),
    operationClose: document.querySelector(`.btn-circle.close`),
    operationDepositXMark: document.querySelector(`.operation--deposit .operation-xmark`),
    operationTransferXMark: document.querySelector(`.operation--transfer .operation-xmark`),
    operationCloseXMark: document.querySelector(`.operation--close .operation-xmark`),
  },
  other: {
    logos: document.querySelectorAll(`.logo`),
    faderTop: document.querySelector(`.fader--top`),
    faderBottom: document.querySelector(`.fader--bottom`),
    sortIcon: document.querySelector(`.sort--icon`),
    overlay: document.querySelector(`.overlay`),
    titles: document.querySelector(`.titles`),
  },
};

// ----- Functions -----
// --- Balance ---
const updateAccountBalance = account => (account.balance = calcBalance(account));
const calcBalance = account => account.movements.reduce((acc, mov) => acc + mov.amount, 0);
const displayBalance = balance => (elements.labels.balance.textContent = `${balance} €`);

// --- Summary ---
const calcIn = account => account.movements.reduce((acc, mov) => (mov.amount > 0 ? acc + mov.amount : acc), 0);
const displayIn = sumIn => (elements.labels.sumIn.textContent = `${Math.round(sumIn * 100) / 100} €`);
const calcOut = account => account.movements.reduce((acc, mov) => (mov.amount < 0 ? acc + mov.amount : acc), 0);
const displayOut = sumOut => (elements.labels.sumOut.textContent = `${Math.abs(Math.round(sumOut * 100) / 100)} €`);
const calcInterest = (P, R, T = 1) => P * R * T;
const displayInterest = interest => (elements.labels.sumInterest.textContent = `${Math.round(interest * 100) / 100} €`);

// --- Validation ---
const validateCredentials = (username, password) => (accounts.find(acc => acc.username === username && acc.pin === password) !== undefined ? true : false);
const validName = name => [...name].reduce((acc, s, _, __, c = s.charCodeAt(0)) => acc && ((c > 64 && c < 91) || (c > 96 && c < 123) || c === 45), true);
const checkEmptyFields = (...fields) => fields.reduce((acc, field) => acc && field.value !== ``, true);

// --- Operations ---
const buildMovement = (type, description, amount) => ({ type, description, amount });
const buildDeposit = buildMovement.bind(null, `deposit`);
const buildOnlineDeposit = buildMovement.bind(null, `deposit`, `Online Deposit`);
const buildATMWithdrawal = buildMovement.bind(null, `withdrawal`, `ATM Withdrawal`);
const buildWireTransfer = buildMovement.bind(null, `transfer`);

// --- Input fields ---
const getInputValue = input => input.value.trim();
const clearFields = (...fields) => fields.forEach(f => (f.value = ``));

// --- Other ---
const emptyMovementsContainer = () => document.querySelectorAll(`.movements__row`).forEach(row => row.remove());
const swapTheme = () => (currentAccount.theme = currentAccount.theme === themes.bright ? themes.dark : themes.bright);
const closeConfirmation = () => elements.buttons.popupConfirm.removeEventListener(`click`, actionOnConfirm);
const fixName = name => name[0].toUpperCase() + name.slice(1).toLowerCase();

// --- UI ---
function handleLoginUI() {
  elements.containers.login.classList.add(`hidden`);
  elements.containers.app.classList.remove(`hidden`);
  elements.containers.nav.classList.remove(`hidden`);
  elements.labels.welcome.textContent = messages.welcome(currentAccount.owner.split(` `)[0]);
  elements.labels.username.textContent = currentAccount.username;
  changeTheme(currentAccount.theme);
}

function handleLogOutUI() {
  hideSettings();
  emptyMovementsContainer();
  elements.containers.app.classList.add(`hidden`);
  elements.containers.nav.classList.add(`hidden`);
  elements.containers.login.classList.remove(`hidden`);
  elements.forms.signUpPIN.classList.add(`slide-left`);
  elements.forms.signUp.classList.remove(`scale-down`);
  elements.forms.signUp.classList.add(`slide-left`);
  elements.forms.logIn.classList.remove(`slide-right`);
  elements.labels.welcome.textContent = ``;
  currentMovementsSortState = defaultMovementsSortState;
  loggingIn = true;
  signingUpStep = 0;
  changeTheme(defaultTheme);
}

function updateUI(account) {
  displayMovements(account.movements);
  displayBalance(account.balance);
  displayIn(calcIn(account));
  displayOut(calcOut(account));
  displayInterest(calcInterest(account.balance, account.interestRate));
}

function displayMovements(movements) {
  emptyMovementsContainer();
  elements.containers.movements.classList.remove(`empty`);
  elements.containers.summary.classList.remove(`hidden`);
  elements.other.titles.classList.remove(`hidden`);

  if (movements.length === 0) {
    elements.containers.movements.classList.add(`empty`);
    elements.containers.summary.classList.add(`hidden`);
    elements.other.titles.classList.add(`hidden`);
  } else {
    movements.forEach(function (movement) {
      const movementType = movement.type;
      const movementHTML = `<div class="movements__row">
                              <div class="movements__type ${movementType}">${movementType}</div>
                              <div class="movements__description">${movement.description}</div>
                              <div class="movements__value">${movement.amount} €</div>
                            </div>`;

      elements.other.faderTop.insertAdjacentHTML(`afterend`, movementHTML);
    });
  }
}

function sortMovements(movements, sortFunction = sortFunctions.get(0).sortFunction) {
  elements.other.sortIcon.innerHTML = sortFunctions.get(currentMovementsSortState).btnInnerHTML;
  if (sortFunction === sortFunctions.get(0).sortFunction) return movements;

  return sortFunction(movements.slice());
}

function switchLoginPage() {
  elements.forms.logIn.classList.toggle(`slide-right`);
  elements.forms.signUp.classList.toggle(`slide-left`);

  loggingIn = !loggingIn;
  signingUpStep = signingUpStep === 1 ? 0 : 1;
}

function displaySignUpNextPage() {
  elements.forms.signUp.classList.add(`scale-down`);
  elements.forms.signUpPIN.classList.remove(`slide-left`);
}

function toggleOperation(operation) {
  operation.classList.toggle(`slide-up`);
  elements.other.overlay.classList.toggle(`hidden`);
}

function hideSettings() {
  elements.buttons.settingsMenu.classList.toggle(`reveal-left`);
  elements.labels.welcome.classList.toggle(`hide-up`);
  elements.labels.username.classList.toggle(`hide-up`);
}

function displayInputError(errorMessage) {
  const currentInputError = getCurrentInputError();

  currentInputError.textContent = errorMessage;
  currentInputError.classList.remove(`hidden`);
  currentInputError.classList.add(`shake`);
}

function hideInputError() {
  const currentInputError = getCurrentInputError();

  currentInputError.classList.add(`hidden`);
  currentInputError.classList.remove(`shake`);
}

// --- Login ---
function validateLogin() {
  const username = getInputValue(elements.inputs.login.loginUsername);
  const password = Number(getInputValue(elements.inputs.login.loginPin));

  if (!validateCredentials(username, password)) return displayInputError(messages.errors.invalidCredentials.credentials());

  clearFields(elements.inputs.login.loginUsername, elements.inputs.login.loginPin);
  login(username);
}

function login(username) {
  currentAccount = accounts.find(acc => acc.username === username);
  loggingIn = false;
  handleLoginUI();
  updateAccountBalance(currentAccount);
  updateUI(currentAccount);

  if (currentAccount.firstVisit) {
    currentAccount.firstVisit = false;
    error(messages.firstVisit(currentAccount.username));
  }
}

// --- Signup ---
function createAccountStep1() {
  if (!checkEmptyFields(elements.inputs.login.signUpFirstName, elements.inputs.login.signUpLastName)) return;

  let firstName = getInputValue(elements.inputs.login.signUpFirstName);
  let lastName = getInputValue(elements.inputs.login.signUpLastName);

  if (!validName(firstName) || !validName(lastName) || firstName.length < 2 || lastName.length < 2) return displayInputError(messages.errors.invalidCredentials.wrongCharsInName());

  firstName = fixName(firstName);
  lastName = fixName(lastName);

  accounts.push({
    owner: `${firstName} ${lastName}`,
    username: createUsername(firstName, lastName),
    movements: [],
    interestRate: 0.01,
    theme: defaultTheme,
    firstVisit: true,
  });

  clearFields(elements.inputs.login.signUpFirstName, elements.inputs.login.signUpLastName);
  displaySignUpNextPage();
  signingUpStep = 2;
}

function createAccountStep2() {
  const createPIN = getInputValue(elements.inputs.login.signUpPIN);
  const confirmPIN = getInputValue(elements.inputs.login.signUpPINConfirm);

  if (isNaN(Number(createPIN))) return displayInputError(messages.errors.invalidCredentials.pinCodeInvalidCharachters());

  if (createPIN.length !== 4 || confirmPIN.length !== 4) return displayInputError(messages.errors.invalidCredentials.pinCodeSize());
  if (createPIN !== confirmPIN) return displayInputError(messages.errors.invalidCredentials.pinCodesNotMatching());

  const PIN = Number(createPIN);

  accounts.at(-1).pin = PIN;
  console.log(accounts.at(-1));

  clearFields(elements.inputs.login.signUpPIN, elements.inputs.login.signUpPINConfirm);
  login(accounts.at(-1).username);
}

function createUsername(firstName, lastName) {
  let username = (firstName[0] + lastName).toUpperCase();
  let equalUsersCount = 1;
  accounts.forEach(
    acc =>
      acc.username
        .split(``)
        .filter(char => isNaN(char))
        .join(``) === username && equalUsersCount++
  );

  const usernameNumber = equalUsersCount.toString().padStart(6, `0`);
  return username + usernameNumber;
}

// --- Operations ---
function validateDeposit() {
  elements.buttons.deposit.blur();
  if (!checkEmptyFields(elements.inputs.app.depositAmount)) return;
  if (elements.operations.deposit.classList.contains(`slide-up`)) toggleOperation(elements.operations.deposit);

  const amount = Number(getInputValue(elements.inputs.app.depositAmount));

  if (amount <= 0) return error(messages.errors.invalidAmount.negativeValue(operations.deposit));
  if (amount < minMovementAmount) return error(messages.errors.invalidAmount.movementMin(operations.deposit));
  if (amount > maxDeposit) return error(messages.errors.invalidAmount.movementLimit(operations.deposit));

  actionOnConfirm = () => deposit(amount);
  elements.buttons.popupConfirm.addEventListener(`click`, actionOnConfirm);
  displayPopup(messages.popup.builtMessage(messages.popup.deposit(amount)));
}

function deposit(amount) {
  currentAccount.movements.push(buildOnlineDeposit(amount));
  updateAccountBalance(currentAccount);
  updateUI(currentAccount);
  hidePopup();
}

function validateWithdrawal() {
  elements.buttons.withdraw.blur();
  if (!checkEmptyFields(elements.inputs.app.withdrawalAmount)) return;
  if (elements.operations.deposit.classList.contains(`slide-up`)) toggleOperation(elements.operations.deposit);

  const amount = Number(getInputValue(elements.inputs.app.withdrawalAmount));
  if (amount <= 0) return error(messages.errors.invalidAmount.negativeValue(operations.withdraw));
  if (amount < minMovementAmount) return error(messages.errors.invalidAmount.movementMin(operations.withdraw));
  if (amount > currentAccount.balance) return error(messages.errors.invalidAmount.insufficientBalance());

  actionOnConfirm = () => withdraw(amount);
  elements.buttons.popupConfirm.addEventListener(`click`, actionOnConfirm);
  displayPopup(messages.popup.builtMessage(messages.popup.withdraw(amount)));
}

function withdraw(amount) {
  currentAccount.movements.push(buildATMWithdrawal(amount * -1));
  updateAccountBalance(currentAccount);
  updateUI(currentAccount);
  hidePopup();
}

function validateTransfer() {
  elements.buttons.transfer.blur();
  if (!checkEmptyFields(elements.inputs.app.transferTo, elements.inputs.app.transferAmount)) return;
  if (elements.operations.transfer.classList.contains(`slide-up`)) toggleOperation(elements.operations.transfer);

  const recipient = getInputValue(elements.inputs.app.transferTo);
  const amount = Number(getInputValue(elements.inputs.app.transferAmount));

  if (recipient === currentAccount.username) return error(messages.errors.invalidCredentials.selfTransfer());
  if (amount <= 0) return error(messages.errors.invalidAmount.negativeValue(operations.transfer));
  if (amount < minMovementAmount) return error(messages.errors.invalidAmount.movementMin(operations.transfer));
  if (amount > maxDeposit) return error(messages.errors.invalidAmount.movementLimit(operations.transfer));
  if (amount > currentAccount.balance) return error(messages.errors.invalidAmount.insufficientBalance());

  const recipientIndex = accounts.findIndex(acc => acc.username === recipient);
  if (recipientIndex === -1) return error(messages.errors.invalidCredentials.username(recipient));

  actionOnConfirm = () => transfer(recipientIndex, amount);
  elements.buttons.popupConfirm.addEventListener(`click`, actionOnConfirm);
  displayPopup(messages.popup.builtMessage(messages.popup.transfer(accounts[recipientIndex].owner, amount)));
}

function transfer(recipientIndex, amount) {
  currentAccount.movements.push(buildWireTransfer(`Wire transfer to ${accounts[recipientIndex].owner}`, amount * -1));
  accounts[recipientIndex].movements.push(buildDeposit(`Wire transfer from ${currentAccount.owner}`, amount));
  updateAccountBalance(currentAccount);
  updateUI(currentAccount);
  hidePopup();
}

function validateAccountClosure() {
  elements.buttons.close.blur();
  if (!checkEmptyFields(elements.inputs.app.closeUsername, elements.inputs.app.closePin)) return;
  if (elements.operations.close.classList.contains(`slide-up`)) toggleOperation(elements.operations.close);

  const username = getInputValue(elements.inputs.app.closeUsername);
  const password = Number(getInputValue(elements.inputs.app.closePin));

  if (username !== currentAccount.username || password !== currentAccount.pin) return error(messages.errors.invalidCredentials.credentials());

  actionOnConfirm = () => closeAccount();
  elements.buttons.popupConfirm.addEventListener(`click`, actionOnConfirm);
  displayPopup(messages.popup.builtMessage(messages.popup.closeAccount()));
}

function closeAccount() {
  accounts.splice(accounts.indexOf(currentAccount), 1);
  handleLogOutUI();
  hidePopup();
}

// --- Popup ---
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
  elements.containers.popup.classList.add(`error`);
  elements.buttons.popupConfirm.textContent = `OK`;
  displayPopup(error);
  actionOnConfirm = () => hidePopup();
  elements.buttons.popupConfirm.addEventListener(`click`, actionOnConfirm);
}

// --- Other ---
function changeTheme(theme) {
  elements.buttons.theme.innerHTML = theme.icon;
  elements.containers.body.style.backgroundColor = theme.backgroundColor;
  elements.containers.body.style.color = theme.color;
  elements.containers.movements.style.backgroundColor = theme.movementsBackgroundColor;
  elements.other.faderTop.style.backgroundImage = theme.faderTop;
  elements.other.faderBottom.style.backgroundImage = theme.faderBottom;
  elements.containers.popup.style.backgroundColor = theme.popupBackgroundColor;
  elements.buttons.sort.style.color = elements.containers.popup.style.color = elements.buttons.popupCancel.style.color = elements.buttons.popupClose.style.color = theme.color;
  elements.other.logos.forEach(logo => (logo.src = theme.logoSrc));
  elements.buttons.settings.style.color = theme.color;
  elements.buttons.settingsMenu.style.backgroundColor = theme.settingsMenuBackgroundColor;
}

function getCurrentInputError() {
  if (signingUpStep === 0) return elements.labels.inputErrorLogin;
  if (signingUpStep === 1) return elements.labels.inputErrorSignup;
  return elements.labels.inputErrorPin;
}

// ----- App Logic -----
// --- Event Listeners ---
// General
for (const form of Object.values(elements.forms)) form.addEventListener(`submit`, e => e.preventDefault());
for (const input of Object.values(elements.inputs.login)) input.addEventListener(`focus`, hideInputError);

// Login
elements.buttons.login.addEventListener(`click`, validateLogin);
document.addEventListener(`keydown`, e => e.key === `Enter` && loggingIn && validateLogin(e));
elements.buttons.signUpPage.addEventListener(`click`, switchLoginPage);
elements.buttons.logInPage.addEventListener(`click`, switchLoginPage);
elements.buttons.signUpNext.addEventListener(`click`, createAccountStep1);
document.addEventListener(`keydown`, e => e.key === `Enter` && signingUpStep === 1 && createAccountStep1());
elements.buttons.signup.addEventListener(`click`, createAccountStep2);
document.addEventListener(`keydown`, e => e.key === `Enter` && signingUpStep === 2 && createAccountStep2());

// Logout
elements.buttons.logout.addEventListener(`click`, handleLogOutUI);

// Operations
elements.buttons.deposit.addEventListener(`click`, validateDeposit);
elements.buttons.withdraw.addEventListener(`click`, validateWithdrawal);
elements.buttons.transfer.addEventListener(`click`, validateTransfer);
elements.buttons.close.addEventListener(`click`, validateAccountClosure);

// Operation buttons
elements.buttons.operationDeposit.addEventListener(`click`, () => toggleOperation(elements.operations.deposit));
elements.buttons.operationTransfer.addEventListener(`click`, () => toggleOperation(elements.operations.transfer));
elements.buttons.operationClose.addEventListener(`click`, () => toggleOperation(elements.operations.close));
elements.buttons.operationDepositXMark.addEventListener(`click`, () => toggleOperation(elements.operations.deposit));
elements.buttons.operationTransferXMark.addEventListener(`click`, () => toggleOperation(elements.operations.transfer));
elements.buttons.operationCloseXMark.addEventListener(`click`, () => toggleOperation(elements.operations.close));

// Popup
elements.buttons.popupCancel.addEventListener(`click`, hidePopup);
elements.buttons.popupClose.addEventListener(`click`, hidePopup);
elements.other.overlay.addEventListener(`click`, () => popupActive && hidePopup());
document.addEventListener(`keydown`, e => e.key === `Escape` && popupActive && hidePopup());
document.addEventListener(`keydown`, e => e.key === `Enter` && popupActive && actionOnConfirm());

// Settings
elements.buttons.settings.addEventListener(`click`, () => isMobile && hideSettings());
elements.buttons.settings.addEventListener(`click`, () => !isMobile && elements.buttons.settingsMenu.classList.toggle(`reveal-left`));
elements.buttons.settingsMenu.addEventListener(`click`, () => !isMobile && elements.buttons.settingsMenu.classList.add(`reveal-left`));
document.addEventListener(
  `mousedown`,
  (event, menu = elements.buttons.settingsMenu) => !isMobile && !elements.buttons.settings.contains(event.target) && !menu.contains(event.target) && menu.classList.remove(`reveal-left`)
);

// Sort movements
elements.buttons.sort.addEventListener(`click`, () =>
  displayMovements(sortMovements(currentAccount.movements, sortFunctions.get(currentMovementsSortState === 2 ? (currentMovementsSortState = 0) : ++currentMovementsSortState).sortFunction))
);

// Theme
elements.buttons.theme.addEventListener(`click`, () => changeTheme(swapTheme()));
