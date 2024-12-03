import React from "react";
import ColorRow from "./ColorRow";
function LabelComponent() {
  const colors = [
    { color: "red", label: "Large Bowel" },
    { color: "green", label: "Small Bowel" },
    { color: "blue", label: "Stomach" },
  ];

  return (
    <div className="color-mapping">
      {colors.map((item, index) => {
        console.log(item.color);
        <ColorRow key={index} color={item.color} label={item.label} />;
      })}
    </div>
  );
}
export default LabelComponent;
