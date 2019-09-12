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
  if (row.isMultiConduit) {
    return multiConduitIcon(cell, row);
  } else {
    return singleConduitIcon(cell, row);
  }
};

const multiConduitIcon = (cell, row) => {
 
};

const singleConduitIcon = (cell, row) => {
  let title, borderColor;
  const color = row.conduit.color;
  const colorMarking = row.conduit.colorMarking;
  const backgroundColor = colorMap[color];
  
  if (color === "CLEAR") {
    title = `CLEAR WITH ${colorMarking} MARKING`;
    borderColor = colorMap[colorMarking];
  } else {
    title = color;
    borderColor = colorMap[color];
  }
  return (
    <span
      title={title}
      className="color-swatch"
      style={{ backgroundColor: backgroundColor, borderColor: borderColor }}
    />
  );
};
