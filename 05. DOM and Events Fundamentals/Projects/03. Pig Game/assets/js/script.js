"use strict";

// ----- Data -----
const elements = {
  dice: document.querySelector(`.dice`),
  player1Score: document.getElementById(`score--1`),
  player2Score: document.getElementById(`score--2`),
  player1Current: document.getElementById(`current--1`),
  player2Current: document.getElementById(`current--2`),
  btnRoll: document.querySelector(`.btn--roll`),
  btnHold: document.querySelector(`.btn--hold`),
  btnStart: document.querySelector(`.btn--restart`),
  btnInstruction: document.querySelector(`.btn--instructions`),
  btnCloseModal: document.querySelector(`.close-modal`),
  player1Section: document.getElementById(`player--1`),
  player2Section: document.getElementById(`player--2`),
  currentSign: document.querySelector(`.current-sign`),
  modal: document.querySelector(`.modal`),
  overlay: document.querySelector(`.overlay`),
};

const buttonsTexts = {
  btnStart: {
    start: `✅ Start game`,
    restart: `🔄 New game`,
  },
};

const scores = {
  player1: 0,
  player2: 0,
};

let currentScore = 0;
let currentPlayer; // Defines which player plays at the moment. Possible values are 1 and 2.
let gameStarted = false; // Determines if the start button has been clicked.
let gameRunning = false; // Determines if there is game left to play. If the game has ended or it hasn't started yet the value is set to false.

// ----- Functions -----
const rollDice = () => Math.floor(Math.random() * 6 + 1);
const selectFirstPlayer = () => Math.floor(Math.random() * 2 + 1);
const setGameBoard = () => (elements.btnStart.textContent = buttonsTexts.btnStart.start);
const startGame = () => (elements.btnStart.textContent = buttonsTexts.btnStart.restart);

function restartGame() {
  scores.player1 = 0;
  scores.player2 = 0;
  currentScore = 0;
  currentPlayer = selectFirstPlayer();

  elements.player1Score.textContent = scores.player1;
  elements.player2Score.textContent = scores.player2;
  elements.player1Current.textContent = currentScore;
  elements.player2Current.textContent = currentScore;
  elements.dice.classList.add(`hidden`);
  elements.player1Section.classList.contains(`player--active`)
    ? elements.player1Section.classList.remove(`player--active`, `player--winner`)
    : elements.player2Section.classList.remove(`player--active`, `player--winner`);
  elements[`player${currentPlayer}Section`].classList.add(`player--active`);

  elements.currentSign.classList.remove(`invisible`, `left`, `right`);
  currentPlayer === 1 ? elements.currentSign.classList.add(`left`) : elements.currentSign.classList.add(`right`);

  gameRunning = true;
}

function switchPlayers() {
  currentScore = 0;
  elements[`player${currentPlayer}Current`].textContent = currentScore;
  elements[`player${currentPlayer}Section`].classList.remove(`player--active`);

  currentPlayer = currentPlayer === 1 ? 2 : 1;
  elements[`player${currentPlayer}Section`].classList.add(`player--active`);

  elements.currentSign.classList.contains(`right`) ? elements.currentSign.classList.replace(`right`, `left`) : elements.currentSign.classList.replace(`left`, `right`);
}

function displayDice(diceValue) {
  if (elements.dice.classList.contains(`hidden`)) elements.dice.classList.remove(`hidden`);
  elements.dice.src = `assets/images/dice-${diceValue}.png`;
}

function handleWin() {
  elements[`player${currentPlayer}Section`].classList.add(`player--winner`);
  elements.dice.classList.add(`hidden`);
  elements.currentSign.classList.add(`invisible`);
  gameRunning = false;
}

function onFocus(element, defaultName) {
  if (element.value === defaultName) element.value = ``;
}

function onBlur(element, defaultName) {
  if (element.value === ``) element.value = defaultName;
}

function toggleModal() {
  elements.modal.classList.toggle(`hidden`);
  elements.overlay.classList.toggle(`hidden`);
}

// ----- Game Logic -----
setGameBoard();

elements.btnRoll.addEventListener(`click`, function () {
  if (gameRunning) {
    const dice = rollDice();
    displayDice(dice);
    if (dice === 1) return switchPlayers();

    currentScore += dice;
    elements[`player${currentPlayer}Current`].textContent = currentScore;
  }
});

elements.btnHold.addEventListener(`click`, function () {
  if (gameRunning) {
    scores[`player${currentPlayer}`] += currentScore;
    elements[`player${currentPlayer}Score`].textContent = scores[`player${currentPlayer}`];
    if (scores[`player${currentPlayer}`] >= 20) return handleWin();

    switchPlayers();
  }
});

elements.btnStart.addEventListener(`click`, function () {
  if (!gameStarted) {
    startGame();
    gameStarted = true;
  }

  restartGame();
});

elements.btnInstruction.addEventListener(`click`, toggleModal);

elements.btnCloseModal.addEventListener(`click`, toggleModal);
elements.overlay.addEventListener(`click`, toggleModal);

document.addEventListener(`keydown`, function (e) {
  if (e.key === `Escape` && !elements.modal.classList.contains(`hidden`)) toggleModal();
});
