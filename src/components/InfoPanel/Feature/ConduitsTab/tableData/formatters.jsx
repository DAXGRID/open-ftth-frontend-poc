import React from "react";
import { colorMap } from "lib/mapbox/constants";

export const addressFormatter = (cell, row) => {
  if (cell) {
    return (
      <>
        <div>
          <strong>{cell.name}</strong>
        </div>
        <div>{cell.address}</div>
      </>
    );
  }
};

export const iconFormatter = (cell, row) => {
  return "64";
};

export const colorFormatter = (cell, row) => {
  let title, borderColor;

  const backgroundColor = colorMap[cell];
  if (cell === "CLEAR") {
    title = `CLEAR WITH ${row.colorMarking} MARKING`;
    borderColor = colorMap[row.colorMarking];
  } else {
    title = cell;
    borderColor = colorMap[cell];
  }
  return (
    <span
      title={title}
      className="color-swatch"
      style={{ backgroundColor: backgroundColor, borderColor: borderColor }}
    />
  );
};
