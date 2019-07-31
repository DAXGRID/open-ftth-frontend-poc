import {
  colorFormatter,
  sortCaret,
  conduitType,
  conduitToLocation,
  lineLength
} from "./decorators";

export const conduitsColumns = [
  {
    text: "",
    dataField: "color",
    formatter: colorFormatter
  },
  {
    text: "Type",
    dataField: "type",
    sort: true,
    sortCaret: sortCaret
  },
  {
    text: "To Location",
    dataField: "toLocation",
    sort: true,
    sortCaret: sortCaret
  },
  {
    text: "Length",
    dataField: "length",
    sort: true,
    sortCaret: sortCaret
  }
];

export const conduitsData = (conduits) => {
  return conduits.map(({ conduitSegment }) => {
    const conduit = conduitSegment.conduit;
    const line = conduitSegment.line;

    return {
      id: conduit.id,
      color: conduit.color,
      colorMarking: conduit.colorMarking,
      type: conduitType(conduit),
      length: lineLength(line),
      toLocation: conduitToLocation(conduit),
      innerConduits: innerConduitsData(conduitSegment.children)
    };
  });
};


const innerConduitsData = children => {
  if (!children) return;
  return children.map(child => {
    const line = child.line;
    const conduit = child.conduit;

    return {
      id: conduit.id,
      color: conduit.color,
      type: conduitType(conduit),
      length: lineLength(line)
      // location: location(conduit)
    };
  });
};
