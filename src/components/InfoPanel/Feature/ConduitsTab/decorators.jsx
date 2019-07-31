import React from "react";

export const conduitType = conduit => {
  if (conduit.assetInfo) {
    return conduit.assetInfo.model.name;
  } else {
    return conduit.name;
  }
};

export const conduitToLocation = conduit => {
  const address = conduit.toRouteNode.locationInfo.accessAddress;
  return `${address.houseNumber} ${address.streetName}`;
};


export const sortCaret = (order, column) => {
  if (!order) return <span style={{ cursor: "pointer" }}>▼</span>;
  else if (order === "asc")
    return <span style={{ cursor: "pointer" }}>▼</span>;
  else if (order === "desc")
    return <span style={{ cursor: "pointer" }}>▲</span>;
  return null;
};

export const colorFormatter = (cell, row) => {
  let title, borderColor;
  const colorMap = {
    CLEAR: "#eeeeee",
    AQUA: "#00FFFF",
    WHITE: "#ffffff",
    BROWN: "#964B00",
    RED: "#FF0000",
    YELLOW: "#FFFF00",
    BLUE: "#0000FF",
    ORANGE: "#FF7F00",
    GREEN: "#00B200",
    PINK: "#ff5def",
    BLACK: "#000",
    GREY: "#808080",
    VIOLET: "#7F00FF"
  };

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

export const lineLength = line => {
  // get last conduitSegment because child conduits return parent conduitSegment first (?)
  const conduitSegment = line.allConduitSegments.slice(-1)[0];
  if (conduitSegment)
    return conduitSegment.allRouteSegments[0].length.toFixed(2);
};
