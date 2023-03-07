// Module for creating the gameboard and maintaining it.
const gameboard = (() => {
  let board = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."]
  ];
  const setBoard = (coord, player) => {
    board[parseInt(coord[0])][parseInt(coord[1])] = player;
  };

  const getBoard = () => {
    return board;
  };

  const restartBoard = () => {
    board = [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."]
    ];
  };

  return { getBoard, setBoard, restartBoard };
})();

// Module for controlling the game
let currentPlayer = ["", ""];

const gameplay = (() => {
  const startGame = () => {
    let one = document.getElementById("playerOne");
    let oneTeam = document.getElementById("teamChoiceOne");
    let two = document.getElementById("playerTwo");
    let twoTeam = document.getElementById("teamChoiceTwo");

    const playerOne = player(one.value, oneTeam.value);
    const playerTwo = player(two.value, twoTeam.value);

    currentPlayer[0] = playerOne.getName();
    currentPlayer[1] = playerOne.getTeam();

    displayBoard();

    let playerChoices = document.getElementById("playerChoices");
    playerChoices.style.display = "none";

    return { playerOne, playerTwo };
  };

  const handleClick = (e) => {
    let tempSquare = document.getElementById(e.target.id);

    if (tempSquare.innerHTML.trim() === "") {
      tempSquare.innerHTML = currentPlayer[1];
      gameboard.setBoard(e.target.id.split(":"), currentPlayer[1]);

      handleWin(e.target.id.split(":"));

      if (currentPlayer[1] === startGame().playerOne.getTeam()) {
        currentPlayer = [
          startGame().playerTwo.getName(),
          startGame().playerTwo.getTeam()
        ];
      } else {
        currentPlayer = [
          startGame().playerOne.getName(),
          startGame().playerOne.getTeam()
        ];
      }
      console.log(currentPlayer);
    } else {
      console.log("Square already taken.");
    }
  };

  const handleWin = (coord) => {
    const board = gameboard.getBoard();

    // Detects all win conditions
    if (
      board[coord[0]][0] === currentPlayer[1] &&
      board[coord[0]][1] === currentPlayer[1] &&
      board[coord[0]][2] === currentPlayer[1]
    ) {
      let winScreen = document.getElementById("winScreen");
      winScreen.className += "win";

      let winPlayer = document.getElementById("playerName");
      winPlayer.innerHTML = currentPlayer[0];
    } else if (
      board[0][coord[1]] === currentPlayer[1] &&
      board[1][coord[1]] === currentPlayer[1] &&
      board[2][coord[1]] === currentPlayer[1]
    ) {
      let winScreen = document.getElementById("winScreen");
      winScreen.className += "win";

      let winPlayer = document.getElementById("playerName");
      winPlayer.innerHTML = currentPlayer[0];
    } else if (
      (board[0][0] === currentPlayer[1] &&
        board[1][1] === currentPlayer[1] &&
        board[2][2] === currentPlayer[1]) ||
      (board[0][2] === currentPlayer[1] &&
        board[1][1] === currentPlayer[1] &&
        board[2][0] === currentPlayer[1])
    ) {
      let winScreen = document.getElementById("winScreen");
      winScreen.className += "win";

      let winPlayer = document.getElementById("playerName");
      winPlayer.innerHTML = currentPlayer[0];
    }
  };

  const restartGame = () => {
    // Reset board variable
    gameboard.restartBoard();

    // Reset turn tracker
    currentPlayer[1] = "X";

    // Reset visible board
    let board = document.getElementById("boardContainer");
    board.style.background = "white";
    board.innerHTML = " ";

    let winScreen = document.getElementById("winScreen");
    winScreen.classList.remove("win");

    let playerChoices = document.getElementById("playerChoices");
    playerChoices.style.display = "grid";
  };

  return { currentPlayer, handleClick, restartGame, startGame };
})();

const player = (name, team) => {
  const getName = () => name;
  const getTeam = () => team;

  return { getName, getTeam };
};

// Function that loops through the board and displays it as a grid.
function displayBoard() {
  const boardContainer = document.getElementById("boardContainer");
  boardContainer.style.background = "black";
  for (let i = 0; i < gameboard.getBoard().length; i++) {
    for (let j = 0; j < gameboard.getBoard()[i].length; j++) {
      let square = document.createElement("div");
      square.addEventListener("click", gameplay.handleClick);
      square.id = i + ":" + j;
      square.className = "square";
      boardContainer.appendChild(square);
    }
  }
}

// Add event listener onto restart button
let restart = document.getElementById("restart");
restart.addEventListener("click", gameplay.restartGame);

// Store player names and start game

let startButton = document.getElementById("startGame");
startButton.addEventListener("click", gameplay.startGame);
