"use strict";

// ----- Constants -----
const maxDeposit = 100_000;
const minMovementAmount = 5;
const sessionTime = 600; // s
const timerUptadeInterval = 1000; // ms
const transactionInterval = 1000; // ms
const dateFormatOptions = {
  day: `2-digit`,
  month: `2-digit`,
  year: `numeric`,
};

const timeFormatOptions = {
  hour: `numeric`,
  minute: `numeric`,
};

const timerFormatOptions = {
  hour: `2-digit`,
  minute: `2-digit`,
};

const fullDateFormatOptions = {
  ...dateFormatOptions,
  ...timeFormatOptions,
};

const currencyMultipliers = {
  USDtoEUR: 0.9,
  EURtoUSD: 1.11,
};

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
      { type: `deposit`, description: `Online Deposit`, date: `2018-05-14T08:45:12.144Z`, amount: 200, currency: `EUR` },
      { type: `deposit`, description: `Online Deposit`, date: `2018-09-20T14:32:09.012Z`, amount: 450, currency: `EUR` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2019-03-03T10:18:36.144Z`, amount: -400, currency: `EUR` },
      { type: `deposit`, description: `Online Deposit`, date: `2019-11-22T12:00:45.234Z`, amount: 3000, currency: `EUR` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2020-01-18T09:10:30.678Z`, amount: -650, currency: `EUR` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2020-04-14T15:45:25.567Z`, amount: -130, currency: `EUR` },
      { type: `deposit`, description: `Online Deposit`, date: `2021-06-12T17:25:48.912Z`, amount: 70, currency: `EUR` },
      { type: `deposit`, description: `Online Deposit`, date: `2022-02-08T13:52:15.354Z`, amount: 1300, currency: `EUR` },
    ],
    interestRate: 0.012,
    pin: 4758,
    currency: `EUR`,
    theme: themes.dark,
    firstVisit: false,
  },
  {
    owner: `Jessica Davis`,
    username: `JDAVIS000001`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, date: `2018-06-18T12:45:22.121Z`, amount: 5000, currency: `USD` },
      { type: `deposit`, description: `Online Deposit`, date: `2019-01-25T09:14:31.543Z`, amount: 3400, currency: `USD` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2019-11-11T15:22:49.674Z`, amount: -150, currency: `USD` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2020-02-07T18:05:12.234Z`, amount: -790, currency: `USD` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2020-12-23T11:32:09.998Z`, amount: -3210, currency: `USD` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2021-04-15T09:13:41.564Z`, amount: -1000, currency: `USD` },
      { type: `deposit`, description: `Online Deposit`, date: `2022-03-04T14:00:59.867Z`, amount: 8500, currency: `USD` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2022-11-11T20:22:10.432Z`, amount: -30, currency: `USD` },
    ],
    interestRate: 0.015,
    pin: 8391,
    currency: `USD`,
    theme: themes.bright,
    firstVisit: false,
  },
  {
    owner: `Steven Williams`,
    username: `SWILLIAMS000001`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, date: `2021-01-20T12:12:14.223Z`, amount: 200, currency: `USD` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2021-03-05T17:22:45.556Z`, amount: -200, currency: `USD` },
      { type: `deposit`, description: `Online Deposit`, date: `2021-08-29T14:15:34.334Z`, amount: 340, currency: `USD` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2021-11-20T11:47:20.445Z`, amount: -300, currency: `USD` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2022-01-17T19:32:41.678Z`, amount: -20, currency: `USD` },
      { type: `deposit`, description: `Online Deposit`, date: `2022-06-23T08:52:09.114Z`, amount: 50, currency: `USD` },
      { type: `deposit`, description: `Online Deposit`, date: `2023-04-02T10:27:44.343Z`, amount: 400, currency: `USD` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2023-07-19T18:19:34.225Z`, amount: -460, currency: `USD` },
    ],
    interestRate: 0.007,
    pin: 2847,
    currency: `USD`,
    theme: themes.bright,
    firstVisit: false,
  },
  {
    owner: `Sarah Smith`,
    username: `SSMITH000001`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, date: `2020-02-05T11:42:16.873Z`, amount: 430, currency: `USD` },
      { type: `deposit`, description: `Online Deposit`, date: `2020-07-10T10:17:09.123Z`, amount: 1000, currency: `USD` },
      { type: `deposit`, description: `Online Deposit`, date: `2021-03-20T15:37:29.111Z`, amount: 700, currency: `USD` },
      { type: `deposit`, description: `Online Deposit`, date: `2021-09-12T08:57:45.421Z`, amount: 50, currency: `USD` },
      { type: `deposit`, description: `Online Deposit`, date: `2022-01-05T20:47:01.563Z`, amount: 90, currency: `USD` },
    ],
    interestRate: 0.01,
    pin: 9432,
    currency: `USD`,
    theme: themes.bright,
    firstVisit: false,
  },
  {
    owner: `Stilyan Atanasov`,
    username: `SATANASOV000001`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, date: `2024-01-04T14:35:22.234Z`, amount: 1000, currency: `EUR` },
      { type: `deposit`, description: `Online Deposit`, date: `2024-02-18T08:12:05.943Z`, amount: 12000, currency: `EUR` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2024-03-09T10:23:45.556Z`, amount: -5000, currency: `EUR` },
      { type: `deposit`, description: `Online Deposit`, date: `2024-04-28T11:33:22.123Z`, amount: 10000, currency: `EUR` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2024-05-11T12:40:13.222Z`, amount: -84, currency: `EUR` },
      { type: `deposit`, description: `Online Deposit`, date: `2024-06-25T17:25:49.564Z`, amount: 750, currency: `EUR` },
      { type: `deposit`, description: `Online Deposit`, date: `2024-07-18T14:17:09.453Z`, amount: 154, currency: `EUR` },
      { type: `deposit`, description: `Online Deposit`, date: `2024-08-05T15:55:34.003Z`, amount: 1478, currency: `EUR` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2024-09-19T20:45:32.467Z`, amount: -747, currency: `EUR` },
    ],
    interestRate: 0.01,
    pin: 6743,
    currency: `EUR`,
    theme: themes.dark,
    firstVisit: false,
  },
  {
    owner: `Antoan Atanasov`,
    username: `AATANASOV000001`,
    movements: [
      { type: `deposit`, description: `Online Deposit`, date: `2024-01-15T10:45:12.567Z`, amount: 1000, currency: `EUR` },
      { type: `deposit`, description: `Online Deposit`, date: `2024-02-10T13:17:29.012Z`, amount: 12000, currency: `EUR` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2024-03-03T14:19:45.678Z`, amount: -5000, currency: `EUR` },
      { type: `deposit`, description: `Online Deposit`, date: `2024-04-22T15:42:22.123Z`, amount: 10000, currency: `EUR` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2024-06-01T08:15:13.456Z`, amount: -84, currency: `EUR` },
      { type: `deposit`, description: `Online Deposit`, date: `2024-07-05T09:55:42.345Z`, amount: 750, currency: `EUR` },
      { type: `deposit`, description: `Online Deposit`, date: `2024-08-09T10:14:34.223Z`, amount: 154, currency: `EUR` },
      { type: `deposit`, description: `Online Deposit`, date: `2024-09-01T11:25:24.054Z`, amount: 1478, currency: `EUR` },
      { type: `withdrawal`, description: `ATM Withdrawal`, date: `2024-09-12T12:55:15.999Z`, amount: -747, currency: `EUR` },
    ],
    interestRate: 0.01,
    pin: 9583,
    currency: `EUR`,
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
      movementLimit: (operation, locale, currency, limit = maxDeposit) => `Error: Cannot ${operation} more than ${formatAmount(locale, currency, limit)} at once!`,
      movementMin: (operation, locale, currency, min = minMovementAmount) => `Error: Cannot ${operation} less than ${formatAmount(locale, currency, min)}!`,
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
    deposit: (amount, locale, currency) => `deposit of ${formatAmount(locale, currency, amount)}`,
    withdraw: (amount, locale, currency) => `withdrawal of ${formatAmount(locale, currency, amount)}`,
    transfer: (recipient, amount, locale, currency) => `transfer of ${formatAmount(locale, currency, amount)} to ${recipient}`,
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
let timer;
let timerInterval;
let nextWatchUpdate;

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
    date: document.querySelector(`.date`),
    balance: document.querySelector(`.balance__value`),
    sumIn: document.querySelector(`.summary__value--in`),
    sumOut: document.querySelector(`.summary__value--out`),
    sumInterest: document.querySelector(`.summary__value--interest`),
    timer: document.querySelector(`.timer`),
    timerBox: document.querySelector(`.logout-timer`),
    popupMessage: document.querySelector(`.popup__message`),
    inputErrorLogin: document.querySelector(`.input__error.login`),
    inputErrorSignup: document.querySelector(`.input__error.signup`),
    inputErrorPin: document.querySelector(`.input__error.pin`),
    currency: document.querySelector(`.currency`),
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
    currencyBox: document.querySelector(`.currency--box`),
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
// --- Currency ---
const currencyMultiplier = (amount, currency, targetCurrency) => (currency !== targetCurrency ? amount * currencyMultipliers[`${currency}to${targetCurrency}`] : amount);

// --- Balance ---
const updateAccountBalance = account => (account.balance = calcBalance(account));
const calcBalance = account => account.movements.reduce((acc, mov) => acc + currencyMultiplier(mov.amount, mov.currency, account.currency), 0);
const displayBalance = (locale, currency, balance) => (elements.labels.balance.textContent = formatAmount(locale, currency, balance));

// --- Summary ---
const calcIn = account => account.movements.reduce((acc, mov) => (mov.amount > 0 ? acc + currencyMultiplier(mov.amount, mov.currency, account.currency) : acc), 0);
const displayIn = (locale, currency, sumIn) => (elements.labels.sumIn.textContent = formatAmount(locale, currency, sumIn));
const calcOut = account => account.movements.reduce((acc, mov) => (mov.amount < 0 ? acc + currencyMultiplier(mov.amount, mov.currency, account.currency) : acc), 0);
const displayOut = (locale, currency, sumOut) => (elements.labels.sumOut.textContent = formatAmount(locale, currency, sumOut));
const calcInterest = (P, R, T = 1) => P * R * T;
const displayInterest = (locale, currency, interest) => (elements.labels.sumInterest.textContent = formatAmount(locale, currency, interest));

// --- Validation ---
const validateCredentials = (username, password) => (accounts.find(acc => acc.username === username && acc.pin === password) !== undefined ? true : false);
const validName = name => [...name].reduce((acc, s, _, __, c = s.charCodeAt(0)) => acc && ((c > 64 && c < 91) || (c > 96 && c < 123) || c === 45), true);
const checkEmptyFields = (...fields) => fields.reduce((acc, field) => acc && field.value !== ``, true);

// --- Operations ---
const buildMovement = (type, description, date, amount, currency) => ({ type, description, date, amount, currency });
const buildDeposit = buildMovement.bind(null, `deposit`);
const buildOnlineDeposit = buildMovement.bind(null, `deposit`, `Online Deposit`);
const buildATMWithdrawal = buildMovement.bind(null, `withdrawal`, `ATM Withdrawal`);
const buildWireTransfer = buildMovement.bind(null, `transfer`);

// --- Input fields ---
const getInputValue = input => input.value.trim();
const clearFields = (...fields) => fields.forEach(f => (f.value = ``));

// --- Currency ---
const formatAmount = (locale, currency, amount) => new Intl.NumberFormat(locale, { style: `currency`, currency }).format(amount);
const changeCurrency = currentCurrency => (currentCurrency === `EUR` ? `USD` : `EUR`);

// --- Other ---
const emptyMovementsContainer = () => document.querySelectorAll(`.movements__row`).forEach(row => row.remove());
const swapTheme = () => (currentAccount.theme = currentAccount.theme === themes.bright ? themes.dark : themes.bright);
const closeConfirmation = () => elements.buttons.popupConfirm.removeEventListener(`click`, actionOnConfirm);
const fixName = name => name[0].toUpperCase() + name.slice(1).toLowerCase();
const toggleTimer = () => elements.labels.timerBox.classList.toggle(`hidden`);
const formatFullDate = (locale, options, date) => new Intl.DateTimeFormat(locale, options).format(date);

// --- UI ---
function handleLoginUI() {
  timer = sessionTime;
  toggleTimer();
  triggerTimer();
  elements.labels.welcome.textContent = messages.welcome(currentAccount.owner.split(` `)[0]);
  elements.labels.username.textContent = currentAccount.username;
  updateDate();
  elements.containers.login.classList.add(`hidden`);
  elements.containers.app.classList.remove(`hidden`);
  elements.containers.nav.classList.remove(`hidden`);
  changeTheme(currentAccount.theme);
}

function handleLogOutUI() {
  toggleTimer();
  clearInterval(timerInterval);
  hideSettings();
  hidePopup();
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

function updateUI(account, shouldDisplayMovements = true) {
  shouldDisplayMovements && displayMovements(account.movements);
  updateAccountBalance(account);
  displayBalance(account.locale, account.currency, account.balance);
  displayIn(account.locale, account.currency, calcIn(account));
  displayOut(account.locale, account.currency, calcOut(account));
  displayInterest(account.locale, account.currency, calcInterest(account.balance, account.interestRate));
}

function updateDate() {
  const dateNow = new Date();
  elements.labels.date.textContent = formatFullDate(currentAccount.locale, fullDateFormatOptions, dateNow);
  nextWatchUpdate = (60 - dateNow.getSeconds()) * 1000;
  setTimeout(() => {
    formatFullDate(currentAccount.locale, fullDateFormatOptions, dateNow);
    nextWatchUpdate = 60000;
    setInterval(formatFullDate, nextWatchUpdate, currentAccount.locale, fullDateFormatOptions, new Date());
  }, nextWatchUpdate);
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
      const movementDate = new Date(movement.date);
      const formatedDate = formatDate(movementDate, currentAccount.locale);

      const movementHTML = `<div class="movements__row">
                              <div class="movements__type ${movementType}">${movementType}</div>
                              <div class="movements__description ${movementType}">${movement.description}</div>
                              <div class="movements__date">${formatedDate}</div>
                              <div class="movements__value ${movementType}">${formatAmount(currentAccount.locale, movement.currency, movement.amount)}</div>
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

function updateTimer(timer) {
  timer--;

  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;

  let formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  elements.labels.timer.textContent = formattedTime;

  if (timer === 0) return handleLogOutUI();

  return timer;
}

function triggerTimer() {
  updateTimer(timer);
  timerInterval = setInterval(() => (timer = updateTimer(timer)), timerUptadeInterval);
}

// --- Login ---
function validateLogin() {
  const username = getInputValue(elements.inputs.login.loginUsername);
  const password = +getInputValue(elements.inputs.login.loginPin);

  if (!validateCredentials(username, password)) return displayInputError(messages.errors.invalidCredentials.credentials());

  clearFields(elements.inputs.login.loginUsername, elements.inputs.login.loginPin);
  login(username);
}

function login(username) {
  currentAccount = accounts.findLast(acc => acc.username === username);
  currentAccount.locale = navigator.language;
  loggingIn = false;
  handleLoginUI();
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
    currency: `EUR`,
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

  if (Number.isNaN(+createPIN)) return displayInputError(messages.errors.invalidCredentials.pinCodeInvalidCharachters());

  if (createPIN.length !== 4 || confirmPIN.length !== 4) return displayInputError(messages.errors.invalidCredentials.pinCodeSize());
  if (createPIN !== confirmPIN) return displayInputError(messages.errors.invalidCredentials.pinCodesNotMatching());

  const PIN = +createPIN;

  accounts.at(-1).pin = PIN;

  clearFields(elements.inputs.login.signUpPIN, elements.inputs.login.signUpPINConfirm);
  login(accounts.at(-1).username);
}

function createUsername(firstName, lastName) {
  let username = (firstName[0] + lastName).toUpperCase();
  let equalUsersCount = 1;
  accounts.forEach(acc => acc.username.slice(0, -6) === username && equalUsersCount++);

  const usernameNumber = equalUsersCount.toString().padStart(6, `0`);
  return username + usernameNumber;
}

// --- Operations ---
function validateDeposit() {
  elements.buttons.deposit.blur();
  if (!checkEmptyFields(elements.inputs.app.depositAmount)) return;
  if (elements.operations.deposit.classList.contains(`slide-up`)) toggleOperation(elements.operations.deposit);

  const locale = currentAccount.locale;
  const currency = currentAccount.currency;

  const amount = +(+getInputValue(elements.inputs.app.depositAmount)).toFixed(2);

  if (amount <= 0) return error(messages.errors.invalidAmount.negativeValue(operations.deposit));
  if (amount < minMovementAmount) return error(messages.errors.invalidAmount.movementMin(operations.deposit, locale, currency));
  if (amount > maxDeposit) return error(messages.errors.invalidAmount.movementLimit(operations.deposit, locale, currency));

  actionOnConfirm = () => setTimeout(deposit, transactionInterval, amount);
  elements.buttons.popupConfirm.addEventListener(`click`, confirmOperation);
  displayPopup(messages.popup.builtMessage(messages.popup.deposit(amount, locale, currency)));
}

function deposit(amount) {
  currentAccount.movements.push(buildOnlineDeposit(new Date().toISOString(), amount, currentAccount.currency));
  updateUI(currentAccount);
}

function validateWithdrawal() {
  elements.buttons.withdraw.blur();
  if (!checkEmptyFields(elements.inputs.app.withdrawalAmount)) return;
  if (elements.operations.deposit.classList.contains(`slide-up`)) toggleOperation(elements.operations.deposit);

  const locale = currentAccount.locale;
  const currency = currentAccount.currency;

  const amount = +(+getInputValue(elements.inputs.app.withdrawalAmount)).toFixed(2);
  if (amount <= 0) return error(messages.errors.invalidAmount.negativeValue(operations.withdraw));
  if (amount < minMovementAmount) return error(messages.errors.invalidAmount.movementMin(operations.withdraw, locale, currency));
  if (amount > currentAccount.balance) return error(messages.errors.invalidAmount.insufficientBalance());

  actionOnConfirm = () => setTimeout(withdraw, transactionInterval, amount);
  elements.buttons.popupConfirm.addEventListener(`click`, confirmOperation);
  displayPopup(messages.popup.builtMessage(messages.popup.withdraw(amount, locale, currency)));
}

function withdraw(amount) {
  currentAccount.movements.push(buildATMWithdrawal(new Date().toISOString(), amount * -1, currentAccount.currency));
  updateUI(currentAccount);
}

function validateTransfer() {
  elements.buttons.transfer.blur();
  if (!checkEmptyFields(elements.inputs.app.transferTo, elements.inputs.app.transferAmount)) return;
  if (elements.operations.transfer.classList.contains(`slide-up`)) toggleOperation(elements.operations.transfer);

  const recipient = getInputValue(elements.inputs.app.transferTo);
  const amount = +(+getInputValue(elements.inputs.app.transferAmount)).toFixed(2);
  const locale = currentAccount.locale;
  const currency = currentAccount.currency;

  if (recipient === currentAccount.username) return error(messages.errors.invalidCredentials.selfTransfer());
  if (amount <= 0) return error(messages.errors.invalidAmount.negativeValue(operations.transfer));
  if (amount < minMovementAmount) return error(messages.errors.invalidAmount.movementMin(operations.transfer, locale, currency));
  if (amount > maxDeposit) return error(messages.errors.invalidAmount.movementLimit(operations.transfer, locale, currency));
  if (amount > currentAccount.balance) return error(messages.errors.invalidAmount.insufficientBalance());

  const recipientIndex = accounts.findIndex(acc => acc.username === recipient);
  if (recipientIndex === -1) return error(messages.errors.invalidCredentials.username(recipient));

  actionOnConfirm = () => setTimeout(transfer, transactionInterval, recipientIndex, amount);
  elements.buttons.popupConfirm.addEventListener(`click`, confirmOperation);
  displayPopup(messages.popup.builtMessage(messages.popup.transfer(accounts[recipientIndex].owner, amount, locale, currency)));
}

function transfer(recipientIndex, amount) {
  currentAccount.movements.push(buildWireTransfer(`Wire transfer to ${accounts[recipientIndex].owner}`, new Date().toISOString(), amount * -1, currentAccount.currency));
  accounts[recipientIndex].movements.push(buildDeposit(`Wire transfer from ${currentAccount.owner}`, new Date().toISOString(), amount, currentAccount.currency));
  updateUI(currentAccount);
}

function validateAccountClosure() {
  elements.buttons.close.blur();
  if (!checkEmptyFields(elements.inputs.app.closeUsername, elements.inputs.app.closePin)) return;
  if (elements.operations.close.classList.contains(`slide-up`)) toggleOperation(elements.operations.close);

  const username = getInputValue(elements.inputs.app.closeUsername);
  const password = +getInputValue(elements.inputs.app.closePin);

  if (username !== currentAccount.username || password !== currentAccount.pin) return error(messages.errors.invalidCredentials.credentials());

  actionOnConfirm = () => closeAccount();
  elements.buttons.popupConfirm.addEventListener(`click`, confirmOperation);
  displayPopup(messages.popup.builtMessage(messages.popup.closeAccount()));
}

function closeAccount() {
  accounts.splice(accounts.indexOf(currentAccount), 1);
  handleLogOutUI();
}

function confirmOperation() {
  hidePopup();
  actionOnConfirm();
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

// --- Dates ---
function calcDaysPassed(dateOld, dateNew = new Date()) {
  const oldDateNormalized = new Date(dateOld).setHours(0, 0, 0, 0);
  const newDateNormalized = new Date(dateNew).setHours(0, 0, 0, 0);

  return Math.round((newDateNormalized - oldDateNormalized) / 86_400_000);
}

function formatDate(date, locale) {
  const daysPassed = calcDaysPassed(date);
  const time = new Intl.DateTimeFormat(locale, timeFormatOptions).format(date);

  if (!daysPassed) return `<p>TODAY</p><p>${time}</p>`;
  if (daysPassed === 1) return `<p>YESTERDAY</p><p>${time}</p>`;

  const dateFormated = new Intl.DateTimeFormat(locale, dateFormatOptions).format(date);
  return `<p>${dateFormated}</p><p>${time}</p>`;
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

function changeAccountCurrency(account) {
  const newCurrency = changeCurrency(account.currency);
  account.currency = elements.labels.currency.textContent = newCurrency;
  updateUI(account, false);
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
document.addEventListener(`keydown`, e => e.key === `Enter` && popupActive && confirmOperation());

// Settings
elements.buttons.settings.addEventListener(`click`, () => isMobile && hideSettings());
elements.buttons.settings.addEventListener(`click`, () => !isMobile && elements.buttons.settingsMenu.classList.toggle(`reveal-left`));
elements.buttons.settingsMenu.addEventListener(`click`, () => !isMobile && elements.buttons.settingsMenu.classList.add(`reveal-left`));
document.addEventListener(
  `mousedown`,
  (event, menu = elements.buttons.settingsMenu) => !isMobile && !elements.buttons.settings.contains(event.target) && !menu.contains(event.target) && menu.classList.remove(`reveal-left`)
);
elements.buttons.theme.addEventListener(`click`, () => changeTheme(swapTheme()));
elements.buttons.currencyBox.addEventListener(`click`, () => changeAccountCurrency(currentAccount));

// Sort movements
elements.buttons.sort.addEventListener(`click`, () =>
  displayMovements(sortMovements(currentAccount.movements, sortFunctions.get(currentMovementsSortState === 2 ? (currentMovementsSortState = 0) : ++currentMovementsSortState).sortFunction))
);
