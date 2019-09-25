import { colorMap } from "lib/constants";

export const toLocation = (line, relation) => {
  return location(line.startRouteNode)
}

export const fromLocation = (line, relation) => {
  return location(line.endRouteNode)
}

const location = (node) => {
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
