"use strict";

const playerStatus = document.querySelector(".playerStatus");
const restartButton = document.querySelector("#restart");
const playerText = document.querySelector(".playerText");
const boxes = Array.from(document.getElementsByClassName("box"));
boxes.forEach((box) => box.addEventListener("click", boxClicked));
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const spaces = Array(9).fill(null);

let currentPlayer = "X";

function boxClicked(event) {
  const boxIndex = event.target.id;

  if (!spaces[boxIndex]) {
    spaces[boxIndex] = currentPlayer;
    event.target.innerText = currentPlayer;
    const filledBoxCount = spaces.filter((space) => space).length;

    if (filledBoxCount === 9 && !playerHasWon()) {
      playerStatus.innerHTML = `It's a Draw!`;
      boxes.forEach((box) => box.removeEventListener("click", boxClicked));
      return;
    }
    if (playerHasWon()) {
      playerStatus.innerHTML = `${currentPlayer} Has Won!`;
      boxes.forEach((box) => box.removeEventListener("click", boxClicked));
      return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerStatus.innerHTML = `${currentPlayer}'s Turn!`;
  }
}

function playerHasWon() {
  for (let condition of winningCombinations) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      return true;
    }
  }
  return false;
}
function restart() {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
  spaces.fill(null);
  boxes.forEach((box) => {
    box.innerText = "";
  });

  playerStatus.innerHTML = "X Starts The Game";

  currentPlayer = "X";
}
restartButton.addEventListener("click", restart);
