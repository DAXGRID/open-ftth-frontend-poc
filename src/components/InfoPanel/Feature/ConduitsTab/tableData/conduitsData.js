import {
  toLocation,
  fromLocation,
  lineConduitSegments,
  routeSegments
} from "./parsers";

const conduitsData = currentFeature => {
  const nodeID = currentFeature.id;

  // TODO hardcoded routeNode
  const conduits = currentFeature.routeNode.relatedConduits;

  return conduits.map(({ conduit, conduitSegment, relationType }) => {
    const line = conduitSegment.line;

    // TODO - split out detail information and parse it there
    return {
      id: conduit.id,
      // color: conduit.color,
      // colorMarking: conduit.colorMarking,
      to: toLocation(line),
      from: fromLocation(line),
      innerConduits: innerConduitsData(
        conduit.id,
        nodeID,
        conduitSegment.children,
        relationType
      ),
      // TODO - explain why we can't look for route features in the same place for a multi and a single conduit
      lineConduitSegments: isMultiConduit(conduitSegment)
        ? routeSegments(conduit)
        : lineConduitSegments(line),
      isMultiConduit: isMultiConduit(conduitSegment),
      conduitSegment,
      conduit,
      relationType: relationType
    };
  });
};

const innerConduitsData = (id, nodeID, children, relationType) => {
  if (!children) return;
  return children.map(conduitSegment => {
    const line = conduitSegment.line;
    const conduit = conduitSegment.conduit;

    return {
      id: conduit.id,
      nodeID: nodeID,
      multiConduitID: id,
      position: parseInt(conduit.position),
      to: toLocation(line),
      from: fromLocation(line),
      lineConduitSegments: lineConduitSegments(line),
      isMultiConduit: isMultiConduit(conduitSegment),
      conduitSegment,
      conduit,
      relationType
    };
  });
};

const isMultiConduit = (conduitSegment) => {
  // TODO - adjust when we actually get cable children?
  return conduitSegment.children && conduitSegment.children.count > 0
}

export default conduitsData;
