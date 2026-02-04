/*
Console version testing:
GameController.playRound(0) (Player One takes top-left)
GameController.playRound(4) (Player Two takes center)
*/
// Game Board module, IFFE "instance" 
const Gameboard = (() => {
  // array of spot on the board
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const placeAndCheckMarker = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true; // Success
    }
    return false; // Spot taken
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { getBoard, placeAndCheckMarker, resetBoard };
})();

// Factory Function Player
const Player = (name, marker) => {
  return { name, marker };
};

// Main Game Controller module, IFFE "instance"
const GameController = (() => {
  const players = [
    Player("Player One", "X"),
    Player("Player Two", "O")
  ];
  
  let activePlayer = players[0];
  let gameOver = false;

  const switchPlayerTurn = () => {
    activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  // logic to check for winner (checking 3 rows)
  const checkWinner = () => {
    const board = Gameboard.getBoard();

    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let condition of winConditions) {
      // This is Destructing in case u forgot wtf is this
      const [a, b, c] = condition;  
      // check 3 in a row win condition (a == b == c)
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Returns 'X' or 'O'
      }
    }
    
    // draw if there are no empty spot on the board ofc
    if (!board.includes("")) return "draw";
    return null;
  };
 
  // Play round logic. Works on console
  const playRound = (index) => {
    if (gameOver) return;

    if (Gameboard.placeAndCheckMarker(index, activePlayer.marker)) {
      const result = checkWinner();
      
      if (result) {
        gameOver = true;
        console.log(result === "draw" ? "It's a tie!" : `${activePlayer.name} wins!`);
      } 
      else 
      {
        switchPlayerTurn();
      }
    } 
    else 
    {
      console.log("Spot already taken, try again.");
    }
    
    console.table(Gameboard.getBoard()); // Visual helper in console
  };

  // reset game state
  function resetGame() {
    gameOver = false;
    activePlayer = players[0];
  }

  return { playRound, getActivePlayer, checkWinner, resetGame };
})();

// Display Controller module, connect and display to HTML part
const displayController = (() => {
  const boardDiv = document.querySelector("#game-board");
  const messageElement = document.querySelector("#message");
  const restartBtn = document.querySelector("#restart-btn");

  // draws the board from scratch
  const render = () => {
    boardDiv.innerHTML = ""; // Clear the board
    const board = Gameboard.getBoard();

    board.forEach((marker, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = index; // link HTML part to game board index via data-index
      cell.textContent = marker;
      cell.addEventListener("click", handleClick);
      boardDiv.appendChild(cell);
    });
  };

  // interactable version of calling GameController.playRound(index)
  const handleClick = (event) => {
    const selectedIndex = event.target.dataset.index;
    
    // Call playRound like in Console version
    GameController.playRound(selectedIndex);
    
    // Refresh the screen
    render();
    updateMessage();
  };

  // play a round but display on HTML only
  const updateMessage = () => {
    // pull the status from GameController
    const winner = GameController.checkWinner();
    if (winner) {
        messageElement.textContent = winner === "draw" ? "It's a Tie!" : `${GameController.getActivePlayer().name} Wins!`;
    } else {
        messageElement.textContent = `${GameController.getActivePlayer().marker}'s Turn`;
    }
  };

  restartBtn.addEventListener("click", () => {
    Gameboard.resetBoard();
    GameController.resetGame();
    render();
    updateMessage();
  });

  // Run once to show the initial empty board
  render();

  return { render };
})();

