"use strict";

// document.querySelector(".message").textContent = "🎉 Correct Number!";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let highScore = 0;
let score = 20;
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

//Game over state so that you can't click check after winning the game
let gameOver = false;

//limit keyboard input to within range for input box
const enforceMinMax = function (el) {
  if (el.value != "") {
    if (parseInt(el.value) < parseInt(el.min)) {
      el.value = el.min;
    }
    if (parseInt(el.value) > parseInt(el.max)) {
      el.value = el.max;
    }
  }
};

//Event to happen with check button is clicked
document.querySelector(".check").addEventListener("click", function () {
  //Event only happen if clicked when the game is not over
  if (!gameOver) {
    const guess = Number(document.querySelector(".guess").value);
    console.log(guess, typeof guess);

    //When there is no input
    if (!guess) {
      displayMessage("⛔️ No number!");

      //When player wins
    } else if (guess === secretNumber) {
      displayMessage("🎉 Correct Number!");
      // document.body.style.backgroundColor = "#60b347"; //works too
      document.querySelector("body").style.backgroundColor = "#60b347";
      document.querySelector(".number").style.width = " 30rem";
      document.querySelector(".number").textContent = secretNumber;

      //check if highscore
      if (score > highScore) {
        highScore = score;
        document.querySelector(".highscore").textContent = highScore;
      }

      gameOver = true;

      //When player input is not the same as secretnumber
    } else if (guess !== secretNumber) {
      //if still got life
      if (score > 1) {
        //if guess higher, display too high, if guess lower, display too low
        displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
        score--;
        document.querySelector(".score").textContent = score;
      } else {
        displayMessage("💥 You lost the game!");
        document.querySelector(".score").textContent = 0;
        document.querySelector("body").style.backgroundColor = "red";
        gameOver = true;
      }
    }
  }
});

//Event to happen with again! button is clicked
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector(".score").textContent = score;
  displayMessage("Start guessing...");
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = " 15rem";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  gameOver = false;
});
