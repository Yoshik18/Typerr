window.addEventListener("load", init);
const level = {
  easy: 8,
  medium: 5,
  hard: 3
};
let currentLevel = level.easy;
let time = currentLevel;
let score = 0;
let isPlaying;

const seconds = document.querySelector("#seconds");
const currentWord = document.querySelector("#current-word");
const wordInput = document.querySelector("#word-input");
const message = document.querySelector("#message");
const timeDisplay = document.querySelector("#time");
const scoreDisplay = document.querySelector("#score");

seconds.innerHTML = 7;

const words = [
  "super",
  "amazing",
  "wonderful",
  "beautiful",
  "crazy",
  "business",
  "awesome",
  "fantastic",
  "live",
  "moment",
  "move",
  "speed",
  "fast",
  "is",
  "as",
  "dog",
  "cat",
  "barking"
];
function init() {
  showWord(words);
  wordInput.addEventListener("input", startMatch);
  setInterval(countDown, 1000);
  setInterval(checkStatus, 50);
}
function startMatch() {
  if (matchWord()) {
    isPlaying = true;
    time = currentLevel;
    showWord(words);
    wordInput.value = "";
    score++;
  }

  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }

  if (score > 9) {
    currentLevel = level.medium;
    seconds.innerHTML = 4;
  }
  if (score > 20) {
    currentLevel = level.hard;
    seconds.innerHTML = 2;
  }
}
function matchWord() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = `Correct!`;
    message.style = "color: #07ea07";
    wordInput.style = "border-color: #07ea07";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}
function showWord(words) {
  const rand = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[rand];
}
function countDown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
}
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = `Game Over`;
    message.style = "color: red";
    wordInput.style = "border-color: red";
    score = -1;
    currentLevel = level.easy;
    seconds.innerHTML = 7;
  }
}
