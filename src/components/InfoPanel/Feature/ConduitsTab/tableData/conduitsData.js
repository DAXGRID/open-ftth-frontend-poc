import {
  toLocation,
  fromLocation,
  lineConduitSegments,
  routeSegments
} from "./parsers";

const conduitsData = currentFeature => {
  const nodeID = currentFeature.id;
  let conduits;

  if (currentFeature.routeNode) {
    conduits = currentFeature.routeNode.relatedConduits;
  } else if (currentFeature.routeSegment) {
    conduits = currentFeature.routeSegment.relatedConduits;
  }


  return conduits.map(({ conduit, conduitSegment, relationType }) => {
    if (!conduit) {debugger}

    if (isMultiConduit(conduit)) {
      return multiConduitData(conduit, conduitSegment, relationType, nodeID);
    } else {
      return conduitData(conduit, conduitSegment, relationType, nodeID);
    }
  });
};

const multiConduitData = (conduit, conduitSegment, relationType, nodeID) => {
  return {
    id: conduit.id,
    to: "",
    from: multiConduitLabel(conduit),
    innerConduits: innerConduitsData(
      conduit.id,
      nodeID,
      conduitSegment.children,
      relationType
    ),
    lineConduitSegments: routeSegments(conduit),
    isMultiConduit: true,
    conduitSegment,
    conduit,
    relationType: relationType
  };
};

const conduitData = (conduit, conduitSegment, relationType, nodeID) => {
  const line = conduitSegment.line;

  return {
    id: conduit.id,
    to: toLocation(line, relationType),
    from: fromLocation(line, relationType),
    innerConduits: innerConduitsData(
      conduit.id,
      nodeID,
      conduitSegment.children,
      relationType
    ),
    lineConduitSegments: lineConduitSegments(line),
    isMultiConduit: false,
    conduitSegment,
    conduit,
    relationType: relationType
  };
};

const innerConduitsData = (id, nodeID, children, relationType) => {
  if (!children) return;
  return children.map(conduitSegment => {
    const line = conduitSegment.line;
    const conduit = conduitSegment.conduit;
    if(!conduit) return undefined;

    return {
      id: conduit.id,
      nodeID: nodeID,
      multiConduitID: id,
      position: parseInt(conduit.position),
      to: toLocation(line),
      from: fromLocation(line),
      lineConduitSegments: lineConduitSegments(line),
      isMultiConduit: isMultiConduit(conduit),
      conduitSegment,
      conduit,
      relationType
    };
  });
};

const isMultiConduit = conduit => {
  return conduit.kind === "MULTI_CONDUIT";
};

const multiConduitLabel = conduit => {
  const name = conduit.assetInfo ? conduit.assetInfo.model.name : "";
  const colorMarking = conduit.colorMarking;
  return { name, colorMarking };
};

export default conduitsData;
