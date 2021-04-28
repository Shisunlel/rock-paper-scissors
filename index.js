let playerScore = 0;
let computerScore = 0;
selection = ["Rock", "Paper", "Scissors"];
computerSelection = "";
playerSelection = "";
const body = document.body;
const rockBtn = document.querySelector("#rock");
const paperBtn = document.querySelector("#paper");
const scissorsBtn = document.querySelector("#scissors");
const resultContainer = document.querySelector("#result");
const notification = document.querySelector("#notification");
const audio = document.querySelector('audio');
audio.volume = 0.1;

const computerPlay = () =>
  //random selection array from 0 to 2 array size
  selection[Math.floor(Math.random() * selection.length)];

const showWinMessage = (playerSelection, computerSelection) =>
  (notification.textContent = `You Win! ${playerSelection} beats ${computerSelection}`);

const showLoseMessage = (playerSelection, computerSelection) =>
  (notification.textContent = `You Lose! ${computerSelection} beats ${playerSelection}`);

const showCurrentScore = (playerScore, computerScore) =>
  (resultContainer.textContent = `${playerScore} : ${computerScore}`);

function playRound(playerSelection, computerSelection) {
  //if both selection is the same
  if (playerSelection === computerSelection) {
    notification.textContent = "Draw";
    return showCurrentScore(playerScore, computerScore);
  }

  //rock beats scissors beats paper beats rock
  if (
    (playerSelection === "Rock" && computerSelection === "Scissors") ||
    (playerSelection === "Scissors" && computerSelection === "Paper") ||
    (playerSelection === "Paper" && computerSelection === "Rock")
  ) {
    showWinMessage(playerSelection, computerSelection);
    playerScore++;
    showCurrentScore(playerScore, computerScore);
  } else {
    showLoseMessage(playerSelection, computerSelection);
    computerScore++;
    showCurrentScore(playerScore, computerScore);
  }
}

function game(playerSelection) {
  if (computerScore != 5 && playerScore != 5) {
    computerSelection = computerPlay();
    playRound(playerSelection, computerSelection);
  }

  if (computerScore == 5) {
    notification.textContent =
      "Humanity Lost! We are going to take over the world. BEEP BOOP ! BEEP BOOP !";
    createResetButton();
    document.querySelector("#reset").onclick = reset;
  }

  if (playerScore == 5) {
    confettiJS();
    audio.play();
    notification.textContent = "Humanity is once again SAVED!! YAYYY!! NOT";
    createResetButton();
    document.querySelector("#reset").onclick = reset;
  }
}

rockBtn.addEventListener("click", (playerSelection) => {
  playerSelection = "Rock";
  game(playerSelection);
});
paperBtn.addEventListener("click", (playerSelection) => {
  playerSelection = "Paper";
  game(playerSelection);
});
scissorsBtn.addEventListener("click", (playerSelection) => {
  playerSelection = "Scissors";
  game(playerSelection);
});

function createResetButton() {
  rockBtn.disabled = true;
  scissorsBtn.disabled = true;
  paperBtn.disabled = true;
  const reset = document.createElement("button");
  reset.textContent = "Play Again";
  reset.setAttribute("id", "reset");
  document
    .querySelector(".button-holder")
    .insertBefore(reset, scissorsBtn.nextSibling);
  document.querySelector("#reset").focus();
}

function reset() {
  playerScore = 0;
  computerScore = 0;
  computerSelection = "";
  playerSelection = "";
  resultContainer.textContent = "";
  notification.textContent = "";
  document
    .querySelector(".button-holder")
    .removeChild(document.querySelector("#reset"));
  rockBtn.disabled = false;
  scissorsBtn.disabled = false;
  paperBtn.disabled = false;
}

function confettiJS() {
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}