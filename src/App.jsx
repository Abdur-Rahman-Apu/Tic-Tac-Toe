import { useState } from "react";

/*

Game 
  -> Board
        ->Square

*/

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="w-12 h-12 border border-black m-1"
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isTurnX, setIsTurnX] = useState(true);

  const winner = calculateWinner(squares);

  console.log(winner, "winner");

  let status;

  winner
    ? (status = `Winner: ${winner}`)
    : (status = `Next player: ${isTurnX ? "X" : "O"}`);

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice(); // clone

    isTurnX ? (nextSquares[i] = "X") : (nextSquares[i] = "O");

    setSquares(nextSquares);
    setIsTurnX(!isTurnX);
    console.log(nextSquares, "nextSquares");
  };

  console.log(squares, "outside");

  return (
    <>
      <div>{status}</div>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    console.log(lines[i]);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
