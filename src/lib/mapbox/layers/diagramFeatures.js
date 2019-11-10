import { colorMap } from "lib/constants";

export const diagramFeatureLayer = ({source, styleLabel, layerID}) => {
  let layer = {
    id: layerID,
    order: 0,
    source,
    filter: ["==", "style", styleLabel]
  }

  let styleProps = layerPropsForStyle[styleLabel]
  if (!styleProps) {
    styleProps = layerPropsForStyle["default"]
  }

  layer = {
    ...layer,
    ...styleProps
  }

  return layer;
}

const layerPropsForStyle = {
  "Well": {
    type: "line",
    order: 0,
    paint: {
      "line-width": 3,
      "line-color": "#000"
    },
  },
  "MultiConduitOrange": {
    type: "fill",
    order: 1,
    paint: {
      "fill-color": colorMap["ORANGE"]
    },
  },
  "BigConduitRed": {
    type: "fill",
    order: 1,
    paint: {
      "fill-color": colorMap["RED"]
    },
  }, 
  "InnerConduitBlue": {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["BLUE"]
    },
  }, 
  "InnerConduitOrange": {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["ORANGE"]
    },
  }, 
  "InnerConduitGreen": {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["GREEN"]
    },
  }, 
  "InnerConduitBrown": {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["BROWN"]
    },
  }, 
  "InnerConduitGrey": {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["GREY"]
    },
  }, 
  "InnerConduitWhite": {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["WHITE"]
    },
  }, 
  "InnerConduitRed": {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["RED"]
    },
  }, 
  "InnerConduitBlack": {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["BLACK"]
    },
  }, 
  "InnerConduitYellow": {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["YELLOW"]
    },
  }, 
  "InnerConduitViolet": {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["VIOLET"]
    },
  }, 
  "CableInsideWell": {
    type: "line",
    order: 3,
    paint: {
      "line-width": 2,
      "line-color": "#000"
    },
  }, 
  "CableOutsideWell": {
    type: "line",
    order: 3,
    paint: {
      "line-width": 2,
      "line-color": "#000"
    },
  },
  "LinkBlockTerminalConnectionPoint": {
    type: "line",
    order: 3,
    paint: {
      "line-width": 2,
      "line-color": "#000"
    },
  }, 
  default: {
    type: "line",
    paint: {
      "line-width": 3,
      "line-color": "#000"
    },
  }
}
