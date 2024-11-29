import React, { useState, useEffect } from "react";
import PuzzlePiece from "./PuzzlePiece";
import "./Puzzle.css";

function Puzzle() {
  const [pieces, setPieces] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(15); // Índice do espaço vazio

  useEffect(() => {
    // Inicializa o quebra-cabeça embaralhado
    const initialPieces = [...Array(15).keys()].map(i => i + 1);
    initialPieces.push(null); // Espaço vazio
    const shuffledPieces = shuffleArray(initialPieces);
    setPieces(shuffledPieces);
    setEmptyIndex(shuffledPieces.indexOf(null)); // Define a posição inicial do espaço vazio
    console.log("Peças embaralhadas:", shuffledPieces);
  }, []);

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleClick = index => {
    if (isMovable(index)) {
      const newPieces = [...pieces];
      [newPieces[emptyIndex], newPieces[index]] = [newPieces[index], newPieces[emptyIndex]];
      setPieces(newPieces);
      setEmptyIndex(index);
      console.log("Peças após movimento:", newPieces);
    } else {
      console.log(`Bloco na posição ${index} não pode ser movido.`);
    }
  };

  const isMovable = index => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;
    const movable = (row === emptyRow && Math.abs(col - emptyCol) === 1) || (col === emptyCol && Math.abs(row - emptyRow) === 1);
    console.log(`Bloco na posição ${index} é movível: ${movable}`);
    return movable;
  };

  const isSolved = () => {
    for (let i = 0; i < 15; i++) {
      if (pieces[i] !== i + 1) {
        return false;
      }
    }
    return pieces[15] === null;
  };

  return (
    <div className="puzzle-board">
      {pieces.map((value, index) => (
        <PuzzlePiece key={index} value={value} onClick={() => handleClick(index)} />
      ))}
      {isSolved() && <div className="solved-message">Parabéns! Você resolveu o quebra-cabeça!</div>}
    </div>
  );
}

export default Puzzle;
