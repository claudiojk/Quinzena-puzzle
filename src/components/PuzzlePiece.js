import React from "react";
import "./PuzzlePiece.css";

function PuzzlePiece({ value, onClick }) {
  return (
    <div className={`puzzle-piece ${value === null ? "empty" : ""}`} onClick={onClick}>
      {value}
    </div>
  );
}

export default PuzzlePiece;

