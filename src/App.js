import React, { useState } from 'react';
import './App.css'; // Make sure to style as needed

const SIZE = 4; // 4x4 Sudoku grid

const Sudoku = () => {
  const [board, setBoard] = useState(Array(SIZE).fill(null).map(() => Array(SIZE).fill(0)));
  const [message, setMessage] = useState('');

  const handleChange = (row, col, value) => {
    const newBoard = board.map(row => row.slice());
    newBoard[row][col] = value ? parseInt(value) : 0; // Update the board
    setBoard(newBoard);
    checkBoard(newBoard);
  };

  const checkBoard = (newBoard) => {
    // Check if the board is valid
    const isValid = checkRows(newBoard) && checkCols(newBoard) && checkBoxes(newBoard);
    if (isValid) {
      setMessage('Valid Move!');
    } else {
      setMessage('Invalid Move. Try Again.');
    }
    if (isBoardComplete(newBoard)) {
      setMessage('Congratulations! You solved the Sudoku!');
    }
  };

  const checkRows = (board) => {
    for (let row of board) {
      const seen = new Set();
      for (let num of row) {
        if (num !== 0 && seen.has(num)) return false;
        seen.add(num);
      }
    }
    return true;
  };

  const checkCols = (board) => {
    for (let col = 0; col < SIZE; col++) {
      const seen = new Set();
      for (let row = 0; row < SIZE; row++) {
        const num = board[row][col];
        if (num !== 0 && seen.has(num)) return false;
        seen.add(num);
      }
    }
    return true;
  };

  const checkBoxes = (board) => {
    for (let boxRow = 0; boxRow < 2; boxRow++) {
      for (let boxCol = 0; boxCol < 2; boxCol++) {
        const seen = new Set();
        for (let row = boxRow * 2; row < boxRow * 2 + 2; row++) {
          for (let col = boxCol * 2; col < boxCol * 2 + 2; col++) {
            const num = board[row][col];
            if (num !== 0 && seen.has(num)) return false;
            seen.add(num);
          }
        }
      }
    }
    return true;
  };

  const isBoardComplete = (board) => {
    for (let row of board) {
      for (let num of row) {
        if (num === 0) return false;
      }
    }
    return true;
  };

  return (
    <div className="sudoku">
      <h1>Simple Sudoku</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((num, colIndex) => (
              <input
                key={colIndex}
                type="number"
                min="1"
                max="4"
                value={num === 0 ? '' : num}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="message">{message}</div>
    </div>
  );
};

export default Sudoku;
