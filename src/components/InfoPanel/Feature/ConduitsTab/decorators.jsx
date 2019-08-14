import React from "react";
import { colorMap } from "lib/mapbox/constants";

export const conduitName = conduit => {
  if (conduit.assetInfo) {
    return conduit.assetInfo.model.name;
  }
};

export const lineLocation = (line, relationType) => {
  let node;

  if (
    (relationType === "INCOMMING" || relationType === "INCOMING") &&
    line.startRouteNode
  ) {
    node = line.startRouteNode;
  } else if (relationType === "OUTGOING" && line.endRouteNode) {
    node = line.endRouteNode;
  }

  if (node && node.locationInfo) {
    const address = node.locationInfo.accessAddress;
    return {
      address: `${address.streetName} ${address.houseNumber}`,
      name: node.name
    };
  }
};

export const sortCaret = (order, column) => {
  if (!order) return <span style={{ cursor: "pointer" }}>▼</span>;
  else if (order === "asc") return <span style={{ cursor: "pointer" }}>▼</span>;
  else if (order === "desc")
    return <span style={{ cursor: "pointer" }}>▲</span>;
  return null;
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

export const lineLength = line => {
  // get last conduitSegment because child conduits return parent conduitSegment first (?)
  // nope
  const conduitSegment = line.allConduitSegments.slice(-1)[0];
  if (conduitSegment)
    return conduitSegment.allRouteSegments[0].length.toFixed(2);
};

export const routeSegments = conduit => {
  return conduit.allRouteSegments.map(routeSegment => ({
    id: routeSegment.id,
    geometry: {
      coordinates: JSON.parse(routeSegment.geometry.coordinates),
      type: routeSegment.geometry.type
    },
    properties: {
      lineWidth: 4,
      lineColor: colorMap[conduit.color]
    }
  }));
};

export const lineConduitSegments = line => {
  const featureArrays = line.allConduitSegments.map(conduitSegment =>
    conduitSegment.allRouteSegments.map(routeSegment => ({
      id: routeSegment.id,
      geometry: {
        coordinates: JSON.parse(routeSegment.geometry.coordinates),
        type: routeSegment.geometry.type
      },
      properties: {
        lineWidth: 4,
        lineColor: colorMap[conduitSegment.conduit.color]
      }
    }))
  );

  return featureArrays.reduce((a, b) => a.concat(b), []);
};

// export const conduitDetails = (line, conduit) => {
//   return {
//     conduitSegments: line.allConduitSegments.map(conduitSegment => ({
//       conduitSegment.
//     })
//   }
// }