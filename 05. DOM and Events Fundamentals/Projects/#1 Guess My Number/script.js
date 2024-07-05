"use strict";

// ----- Data -----
const elements = {
  score: document.querySelector(`.score`),
  highscore: document.querySelector(`.highscore`),
  message: document.querySelector(`.message`),
  guess: document.querySelector(`.guess`),
  body: document.querySelector(`body`),
  number: document.querySelector(`.number`),
  guessMessage: document.querySelector(`.guessMessage`),
  userGuess: document.querySelector(`.userGuess`),
};

const messages = {
  correct: `🎉 Correct Number!`,
  empty: `⛔️ No number!`,
  invalidNumber: `❌ Type a number between 1 and 20!`,
  higher: `📈 Too high!`,
  lower: `📉 Too low!`,
  loss: `💥 You lost the game!`,
};

const colours = {
  red: `#a10000`,
  green: `#60b347`,
  grey: `#222`,
};

let number = Math.floor(Math.random() * 20) + 1;
let gameRunning = true;
elements.guessMessage.style.visibility = `hidden`;

// ----- Functions -----
const handleScore = () => document.querySelector(`.score`).textContent--;
const setGuessMessage = (guess) => (elements.userGuess.textContent = guess);
const isInRange = (guess) => guess >= 1 && guess <= 20;

function handleInvalidGuess(message) {
  elements.message.textContent = message;
  elements.guessMessage.style.visibility = `hidden`;
  elements.guess.value = undefined;
}

function handleCorrect() {
  elements.body.style.backgroundColor = colours.green;
  elements.number.textContent = number;
  elements.message.textContent = messages.correct;

  gameRunning = false;
  handleHighscore();
}

function handleHigher() {
  elements.message.textContent = messages.higher;
  handleScore();
}

function handleLower() {
  elements.message.textContent = messages.lower;
  handleScore();
}

function handleHighscore() {
  if (Number(elements.score.textContent) > Number(elements.highscore.textContent)) elements.highscore.textContent = elements.score.textContent;
}

function handleGuessMessage() {
  if (elements.guessMessage.style.visibility === `hidden`) elements.guessMessage.style.visibility = `visible`;
}

function handleLoss() {
  elements.body.style.backgroundColor = colours.red;
  elements.message.textContent = messages.loss;
  gameRunning = false;
}

// ----- Listeners -----
document.querySelector(`.check`).addEventListener(`click`, function () {
  if (!gameRunning) return;

  const guess = Number(elements.guess.value);
  if (!guess) return handleInvalidGuess(messages.empty);
  if (!isInRange(guess)) return handleInvalidGuess(messages.invalidNumber);

  handleGuessMessage();

  if (guess === number) handleCorrect();
  else guess < number ? handleLower() : handleHigher();

  if (Number(elements.score.textContent) === 0) handleLoss();

  setGuessMessage(guess);
  elements.guess.value = ``;
});

document.querySelector(`.again`).addEventListener(`click`, function () {
  // Reset design
  elements.body.style.backgroundColor = colours.grey;
  elements.message.textContent = `Start guessing...`;
  elements.score.textContent = 20;
  elements.number.textContent = `?`;
  elements.guessMessage.style.visibility = `hidden`;

  number = Math.floor(Math.random() * 20) + 1;
  gameRunning = true;
});
