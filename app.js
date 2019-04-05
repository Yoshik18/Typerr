document.querySelector("#start").addEventListener("click", init);
const level = {
  easy: 8,
  medium: 5,
  hard: 3,
  extreme: 2
};
let currentLevel = level.easy;
let time = currentLevel;
let score = 0;
let isPlaying;
let high;

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
  wordInput.focus();
  wordInput.addEventListener("input", startMatch);
  setInterval(countDown, 1000);
  setInterval(checkStatus, 50);
  document.querySelector("#start").style = "display: none";
}
function startMatch() {
  if (matchWord()) {
    isPlaying = true;
    time = currentLevel;
    showWord(words);
    wordInput.value = "";
    score++;
    highScore();
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
  if (score > 19) {
    currentLevel = level.hard;
    seconds.innerHTML = 2;
  }
  if (score > 34) {
    currentLevel = level.extreme;
    seconds.innerHTML = 1;
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
    if (score > 0) {
      document.querySelector("#high-score").style = "display: block";
      message.innerHTML = `Game Over!! Please reload the page to start a new game.`;
      message.style = "color: red";
      wordInput.style = "border-color: red";
      score = -1;
      currentLevel = level.easy;
      seconds.innerHTML = 7;
      wordInput.disabled = true;
    } else if (score === 0) {
      message.innerHTML = `Game Over!! Please reload the page to start a new game.`;
      message.style = "color: red";
      wordInput.style = "border-color: red";
      score = -1;
      currentLevel = level.easy;
      seconds.innerHTML = 7;
      wordInput.disabled = true;
      document.querySelector("#high-score").style = "display: none";
    }
  }
}

function highScore() {
  let scores;
  if (localStorage.getItem("scores") === null) {
    scores = [];
  } else {
    scores = JSON.parse(localStorage.getItem("scores"));
    high = Math.max(...scores);
  }
  scores.push(score);
  localStorage.setItem("scores", JSON.stringify(scores));

  document.querySelector("#high-score").addEventListener("click", function() {
    swal("Good job!", `Your High Score Is ${high}`, "success", {
      button: "Ohh Yeaahh!!"
    });
  });
}
