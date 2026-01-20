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
      // Logic to check if 3 in a row is match (BUT NOT EMPTY SPOT OFC)
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Returns 'X' or 'O'
      }
    }
    
    // draw if there are no empty spot on the board ofc
    if (!board.includes("")) return "draw";
    return null;
  };

  const playRound = (index) => {
    if (gameOver) return;

    if (Gameboard.placeAndCheckMarker(index, activePlayer.marker)) {
      const result = checkWinner();
      
      if (result) {
        gameOver = true;
        Gameboard.resetBoard()
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

  return { playRound, getActivePlayer };
})();

/*
GameController.playRound(0) (Player One takes top-left)

GameController.playRound(4) (Player Two takes center)

Keep calling playRound(index) until the console logs a winner.
*/