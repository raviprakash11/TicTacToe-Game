import React, { useState } from "react";
import "./GameBoard.scss";
import GameRule from "../../features/game/GameRule";

function GameBoard() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [result, setResult] = useState(null);
    const [resultCells, setResultCells] = useState([]);
    const [isDraw, setIsDraw] = useState(false);

    const isGameOver = result !== null || isDraw;

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer("X");
        setResult(null);
        setResultCells([]);
        setIsDraw(false);
    }

    const handleCellClick = (index) => {
        if (isGameOver || board[index] !== null) {
            return;
        }
        const updatedBoard = [...board];
        updatedBoard[index] = currentPlayer;

        setBoard(updatedBoard);

        const res = GameRule(updatedBoard);

        if (res) {
            setResult(res.result);
            setResultCells(res.resultCells);
            return;
        }

        if (updatedBoard.every((cell) => cell !== null)) {
            setIsDraw(true);
            return;
        }

        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }

    let statusMessage;

    if (result) {
        statusMessage = `Player ${result} wins`;
    } else if (isDraw) {
        statusMessage = "It's a draw";
    } else {
        statusMessage = `Player ${currentPlayer}'s turn`;
    }

    return (
        <div className="mainBoard">
            <h1>Tic Tac Toe</h1>

            <h2 aria-live="polite">{statusMessage}</h2>

            <div className="board-main">
                {board.map((cell, index) => {
                    const isWinning = resultCells.includes(index);

                    return (
                        <button
                            key={index}
                            onClick={() => handleCellClick(index)}
                            disabled={cell !== null || isGameOver}
                            className={`${cell === "X" ? "xCell" : "oCell"} ${isWinning ? "winCell" : ""}`}
                        >
                            {cell}
                        </button>
                    );
                })}
            </div>

            <button className="reset" onClick={handleReset}>
                Reset Game!
            </button>
        </div>
    );
}

export default GameBoard;