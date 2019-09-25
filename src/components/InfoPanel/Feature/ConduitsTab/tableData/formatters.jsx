import React from "react";
import { colorMap } from "lib/constants";
import ConduitIcon from "components/ConduitIcon";

export const addressFormatter = (cell, row) => {
  if (!cell) {
    return;
  }
  const upperLine = cell.name;
  const lowerLine = cell.textMarking
    ? `Marking: ${cell.textMarking.toLowerCase()}`
    : cell.address;

  return (
    <>
      <div>
        <strong>{upperLine}</strong>
      </div>
      <div>&nbsp;{lowerLine}</div>
    </>
  );
};

export const iconFormatter = (cell, row) => {
  if (row.conduit.kind === "MULTI_CONDUIT") {
    return multiConduitIcon(cell, row);
  } else {
    return conduitIcon(cell, row);
  }
};

const multiConduitIcon = (cell, row) => {
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

const conduitIcon = (cell, row) => {
  let cableSize;
  // TODO this is probably not the right logic
  if (row.conduit.children && row.conduit.children.first.kind === "CABLE") {
    cableSize = row.conduit.children.first.cableSize;
  }

  const iconOptions = {
    color: row.conduit.color,
    colorMarking: row.conduit.colorMarking,
    cableSize
  };

  return <ConduitIcon {...iconOptions} />;
};
