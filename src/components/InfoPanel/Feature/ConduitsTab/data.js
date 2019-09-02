import React from "react";
import { useTranslation } from "react-i18next";
import {
  colorFormatter,
  conduitName,
  lineLocation,
  lineLength,
  lineConduitSegments,
  routeSegments
} from "./decorators";
const { t } = useTranslation();

export const conduitsColumns = [
  {
    text: "",
    dataField: "position",
    sort: true,
    hidden: true
  },
  {
    text: "",
    dataField: "color",
    formatter: colorFormatter
  },
  {
    text: t("Type"),
    dataField: "name"
  },
  {
    text: t("End Address"),
    dataField: "address"
  },
  {
    text: t("End Point"),
    dataField: "installationName"
  }
];

export const conduitsData = (conduits, nodeID) => {
  return conduits.map(({ conduit, conduitSegment, relationType }) => {
    const line = conduitSegment.line;
    let locationName, locationAddress;

    if (lineLocation(line, relationType)) {
      locationName = lineLocation(line, relationType).name;
      locationAddress = lineLocation(line, relationType).address;
    }

    return {
      id: conduit.id,
      color: conduit.color,
      colorMarking: conduit.colorMarking,
      name: conduitName(conduit),
      address: locationAddress,
      installationName: locationName,
      length: lineLength(line),
      innerConduits: innerConduitsData(conduit.id, nodeID, conduitSegment.children, relationType),
      // TODO - leave a nice explanation as to why we can't look for route features in the same place for a multi and a single conduit
      lineConduitSegments: conduitSegment.children
        ? routeSegments(conduit)
        : lineConduitSegments(line),
      conduit,
      conduitSegment
    };
  });
};

const innerConduitsData = (id, nodeID, children, relationType) => {
  if (!children) return;
  return children.map(conduitSegment => {
    const line = conduitSegment.line;
    const conduit = conduitSegment.conduit;

    let locationName, locationAddress;

    if (lineLocation(line, relationType)) {
      locationName = lineLocation(line, relationType).name;
      locationAddress = lineLocation(line, relationType).address;
    }

    return {
      id: conduit.id,
      multiConduitID: id,
      nodeID: nodeID,
      position: parseInt(conduit.position),
      color: conduit.color,
      name: conduit.name,
      address: locationAddress,
      installationName: locationName,
      length: lineLength(line),
      lineConduitSegments: lineConduitSegments(line),
      conduit,
      conduitSegment
    };
  });
};
