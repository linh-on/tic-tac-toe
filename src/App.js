import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [playerX, setPlayerX] = useState(true);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [winner, setWinner] = useState("");
  const [playWithFriend, setPlayWithFriend] = useState(true);

  useEffect(() => {
    if (!playWithFriend && !playerX && !winner) {
      const compMove = getComputerMove(board);
      if (compMove !== -1) {
        //Update the board with the random move generated
        const newBoard = board.slice();
        newBoard[compMove] = "O";
        setBoard(newBoard);
        checkWinner(newBoard);
        setPlayerX(true);
      }
    }
  }, [playerX, winner, board, playWithFriend]);

  function handleOption(opt) {
    //set play with friend to true when that option is selected
    setPlayWithFriend(opt);
    restartGame();
    setScoreO(0);
    setScoreX(0);
  }

  function checkWinner(board) {
    //Check to see who is the winner
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < 8; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (board.every((cell) => cell !== "")) {
      setWinner("draw");
    }
  }

  function handleClick(index) {
    //update board and update player
    if (board[index] || winner) return;
    else {
      const newBoard = board.slice();
      newBoard[index] = playerX ? "X" : "O";
      setBoard(newBoard);
      setPlayerX(!playerX);
      checkWinner(newBoard);
    }
  }

  function getComputerMove(board) {
    //Generate a random move for the computer
    const emptyIndices = board
      .map((box, index) => (box === "" ? index : ""))
      .filter((val) => val !== "");
    if (emptyIndices.length === 0) return -1;
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }

  function restartGame() {
    //Set new score and reset the board
    if (winner === "X") {
      setScoreX((prevScore) => prevScore + 1);
    } else if (winner === "O") {
      setScoreO((prevScore) => prevScore + 1);
    } else {
    }
    setBoard(Array(9).fill(""));
    setPlayerX(true);
    setWinner("");
  }

  return (
    <div className="center">
      <div className="text-center">
        <h1 className="header mt-8 mb-4">Let's play Tic Tac Toe!</h1>
        <div className="flex justify-center gap-x-5">
          <button
            className={`opt-btn ${playWithFriend ? "selected" : ""}`}
            onClick={() => handleOption(true)}
          >
            Play with Friend
          </button>
          <button
            className={`opt-btn ${!playWithFriend ? "selected" : ""}`}
            onClick={() => handleOption(false)}
          >
            Play with Computer
          </button>
        </div>
        <p className="mt-4">
          {winner
            ? winner === "draw"
              ? "It's a draw!"
              : `Winner: ${winner}`
            : `Next Player: ${playerX ? "X" : "O"}`}
        </p>

        <div className="mt-2 board">
          <div className="flex">
            <button className="btn" onClick={() => handleClick(0)}>
              {board[0]}
            </button>
            <button className="btn" onClick={() => handleClick(1)}>
              {board[1]}
            </button>
            <button className="btn" onClick={() => handleClick(2)}>
              {board[2]}
            </button>
          </div>
          <div className="flex">
            <button className="btn" onClick={() => handleClick(3)}>
              {board[3]}
            </button>
            <button className="btn" onClick={() => handleClick(4)}>
              {board[4]}
            </button>
            <button className="btn" onClick={() => handleClick(5)}>
              {board[5]}
            </button>
          </div>
          <div className="flex">
            <button className="btn" onClick={() => handleClick(6)}>
              {board[6]}
            </button>
            <button className="btn" onClick={() => handleClick(7)}>
              {board[7]}
            </button>
            <button className="btn" onClick={() => handleClick(8)}>
              {board[8]}
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className="score-board mt-4">
            <p>Player X: {scoreX}</p>
            <p>Player O: {scoreO}</p>
          </div>
          <button
            className="mt-4 font-semibold rounded-sm px-4 py-2 restart mb-6 text-2x1"
            onClick={restartGame}
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
