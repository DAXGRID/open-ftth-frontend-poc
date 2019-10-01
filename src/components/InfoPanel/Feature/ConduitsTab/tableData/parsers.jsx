import { colorMap } from "lib/constants";

export const toLocation = (line, relation) => {
  switch (relation) {
    case "INCOMMING":
      return location(line.endRouteNode);
    case "OUTGOING":
      return location(line.startRouteNode);
    case "PASS_THROUGH":
      return location(line.startRouteNode);
    default:
      return location(line.startRouteNode);
  }
};

export const fromLocation = (line, relation) => {
  switch (relation) {
    case "INCOMMING":
      return location(line.startRouteNode);
    case "OUTGOING":
      return location(line.endRouteNode);
    case "PASS_THROUGH":
      return location(line.endRouteNode);
    default:
      return location(line.endRouteNode);
  }
};

const location = node => {
  if (node && node.locationInfo) {
    const address = node.locationInfo.accessAddress;
    return {
      name: node.name,
      address: `${address.streetName} ${address.houseNumber}`
    };
  }
};

export const routeSegments = conduit => {
  return conduit.allRouteSegments.map(routeSegment => ({
    id: routeSegment.id,
    geometry: {
      coordinates: JSON.parse(routeSegment.geometry.coordinates),
      type: routeSegment.geometry.type
    },
    properties: {
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
        lineColor: colorMap[conduitSegment.conduit.color]
      }
    }))
  );

  return featureArrays.reduce((a, b) => a.concat(b), []);
};
