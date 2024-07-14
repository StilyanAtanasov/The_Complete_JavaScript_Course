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
  btnRestart: document.querySelector(`.btn--restart`),
  player1Section: document.getElementById(`player--1`),
  player2Section: document.getElementById(`player--2`),
};

const scores = {
  player1: 0,
  player2: 0,
};

let currentScore = 0;
let currentPlayer = 1; // Defines which player plays at the moment. Possible values are 1 and 2.
let gameRunning = false;

// ----- Functions -----
const rollDice = () => Math.floor(Math.random() * 6 + 1);

function restartGame() {
  scores.player1 = 0;
  scores.player2 = 0;
  currentScore = 0;
  currentPlayer = 1;

  elements.player1Score.textContent = scores.player1;
  elements.player2Score.textContent = scores.player2;
  elements.player1Current.textContent = currentScore;
  elements.player2Current.textContent = currentScore;
  elements.dice.classList.add(`hidden`);
  elements.player1Section.classList.add(`player--active`);
  elements.player2Section.classList.remove(`player--active`);

  gameRunning = true;
}

function switchPlayers() {
  currentScore = 0;
  elements[`player${currentPlayer}Current`].textContent = currentScore;
  elements[`player${currentPlayer}Section`].classList.remove(`player--active`);

  currentPlayer = currentPlayer === 1 ? 2 : 1;
  elements[`player${currentPlayer}Section`].classList.add(`player--active`);
}

function displayDice(diceValue) {
  if (elements.dice.classList.contains(`hidden`)) elements.dice.classList.remove(`hidden`);
  elements.dice.src = `assets/images/dice-${diceValue}.png`;
}

function handleWin() {
  elements[`player${currentPlayer}Section`].classList.add(`player--winner`);
  gameRunning = false;
}

// ----- Game Logic -----
restartGame();

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
    scores[`player${currentPlayer}`] = currentScore;
    elements[`player${currentPlayer}Score`].textContent = Number(elements[`player${currentPlayer}Score`].textContent) + scores[`player${currentPlayer}`];
    if (scores[`player${currentPlayer}`] >= 100) return handleWin();

    switchPlayers();
  }
});

elements.btnRestart.addEventListener(`click`, restartGame);
