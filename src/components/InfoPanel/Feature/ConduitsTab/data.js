import { useTranslation } from "react-i18next";
import {
  colorFormatter,
  conduitName,
  lineLocation,
  lineLength,
  lineConduitSegments
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
    text: t("Name"),
    dataField: "name"
  },
  {
    text: t("Address"),
    dataField: "address"
  },
  {
    text: t("Installation"),
    dataField: "installationName"
  }
];

export const conduitsData = conduits => {
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
      innerConduits: innerConduitsData(conduitSegment.children, relationType),
      lineConduitSegments: lineConduitSegments(line)
    };
  });
};

const innerConduitsData = (children, relationType) => {
  if (!children) return;
  return children.map(({ line, conduit }) => {
    let locationName, locationAddress;

    if (lineLocation(line, relationType)) {
      locationName = lineLocation(line, relationType).name;
      locationAddress = lineLocation(line, relationType).address;
    }

    return {
      id: conduit.id,
      position: parseInt(conduit.position),
      color: conduit.color,
      name: conduit.name,
      address: locationAddress,
      installationName: locationName,
      length: lineLength(line),
      lineConduitSegments: lineConduitSegments(line)
    };
  });
};
