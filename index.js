let playerScore = 0;
let computerScore = 0;
selection = ["Rock", "Paper", "Scissors"];
computerSelection = "";
playerSelection = "";

const computerPlay = () =>
  //random selection array from 0 to 2 array size
  selection[Math.floor(Math.random() * selection.length)];

const showWinMessage = (playerSelection, computerSelection) =>
  console.log(`You Win! ${playerSelection} beats ${computerSelection}`);

const showLoseMessage = (playerSelection, computerSelection) =>
  console.log(`You Lose! ${computerSelection} beats ${playerSelection}`);

const showCurrentScore = (playerScore, computerScore) =>
  console.log(`${playerScore} : ${computerScore}`);

function playRound(playerSelection, computerSelection) {
  //change first letter to cap and the rest to lowercase
  playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1).toLowerCase();

  //if both selection is the same
  if (playerSelection === computerSelection) {
    console.log("Draw");
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

function game() {
  while (computerScore < 6 && playerScore < 6) {
    playerSelection = prompt("Rock, Paper or Scissors?");

    //validate selection
    while (
      playerSelection.toLowerCase() != "rock" &&
      playerSelection.toLowerCase() != "paper" &&
      playerSelection.toLowerCase() != "scissors"
    ) {
      playerSelection = prompt("Rock, Paper or Scissors?");
    }

    computerSelection = computerPlay();

    playRound(playerSelection, computerSelection);

    if (computerScore == 5 || playerScore == 5) {
      break;
    }
  }

  if (computerScore == 5) {
    console.log(
      "Humanity Lost! We are going to take over the world. BEEP BOOP ! BEEP BOOP !"
    );
  }

  if (playerScore == 5) {
    console.log("Humanity is once again SAVED!! YAYYY!! NOT");
  }
}

game();
