import React from "react";

function ColorRow({ color, label }) {
  const rowStyle = {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
    fontFamily: "Arial, sans-serif",
  };

  const squareStyle = {
    width: "30px",
    height: "30px",
    backgroundColor: color,
    marginRight: "10px",
  };

  return (
    <div style={rowStyle}>
      <div style={squareStyle}></div>
      <span>{label}</span>
    </div>
  );
}

export default ColorRow;
