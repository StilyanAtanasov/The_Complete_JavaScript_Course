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
  start: `Start guessing...`,
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

const getRandomNumber = () => Math.floor(Math.random() * 20) + 1;
let number = getRandomNumber();
let gameRunning = true;
let score = 20;
let highscore = 0;
elements.score.textContent = score;
elements.highscore.textContent = highscore;
elements.guessMessage.style.visibility = `hidden`;

// ----- Functions -----
const handleScore = () => (elements.score.textContent = --score);
const setGuessMessage = (guess) => (elements.userGuess.textContent = guess);
const setMessage = (message) => (elements.message.textContent = message);
const isInRange = (guess) => guess >= 1 && guess <= 20;
const setBodyBackgroundColor = (color) => (elements.body.style.backgroundColor = color);
const setNumberTextContent = (content) => (elements.number.textContent = content);
const setNumberWidth = (width) => (elements.number.style.width = width);
const setGuessMessageVisibility = (visibility) => (elements.guessMessage.style.visibility = visibility);
const setGuessValue = (value) => (elements.guess.value = value);

const handleInvalidGuess = (message) => {
  setMessage(message);
  setGuessMessageVisibility(`hidden`);
  setGuessValue(``);
};

const handleCorrect = () => {
  setBodyBackgroundColor(colours.green);
  setNumberWidth(`30rem`);
  setNumberTextContent(number);
  setMessage(messages.correct);
  gameRunning = false;
  handleHighscore();
};

const handleHigher = () => {
  setMessage(messages.higher);
  handleScore();
};

const handleLower = () => {
  setMessage(messages.lower);
  handleScore();
};

const handleHighscore = () => {
  if (score > highscore) {
    highscore = score;
    elements.highscore.textContent = highscore;
  }
};

const handleGuessMessage = () => {
  if (elements.guessMessage.style.visibility === `hidden`) {
    setGuessMessageVisibility(`visible`);
  }
};

const handleLoss = () => {
  setBodyBackgroundColor(colours.red);
  setMessage(messages.loss);
  gameRunning = false;
};

// ----- Listeners -----
document.querySelector(`.check`).addEventListener(`click`, () => {
  if (!gameRunning) return;

  const guess = Number(elements.guess.value);
  if (!elements.guess.value) return handleInvalidGuess(messages.empty);
  if (!isInRange(guess)) return handleInvalidGuess(messages.invalidNumber);

  handleGuessMessage();

  if (guess === number) handleCorrect();
  else guess < number ? handleLower() : handleHigher();

  if (score === 0) handleLoss();

  setGuessMessage(guess);
  setGuessValue(``);
});

document.querySelector(`.again`).addEventListener(`click`, () => {
  number = getRandomNumber();
  gameRunning = true;
  score = 20;

  // Reset design
  setBodyBackgroundColor(colours.grey);
  setNumberWidth(`15rem`);
  setMessage(messages.start);
  elements.score.textContent = score;
  setNumberTextContent(`?`);
  setGuessMessageVisibility(`hidden`);
  setGuessValue(``);
});
