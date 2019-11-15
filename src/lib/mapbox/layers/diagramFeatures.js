import { colorMap } from "lib/constants";

export const diagramFeatureLayer = ({ source, styleLabel, layerID }) => {
  // Need style label to filter and draw for the right features

  let layer = {
    id: layerID,
    order: 0,
    source,
    filter: ["==", "style", styleLabel]
  };

  let styleProps = layerPropsForStyle[layerID];
  if (!styleProps) {
    styleProps = layerPropsForStyle["default"];
  }

  layer = {
    ...layer,
    ...styleProps
  };

  return layer;
};

const layerPropsForStyle = {
  DF_Well: {
    type: "line",
    order: 0,
    paint: {
      "line-width": 3,
      "line-color": "#555"
    }
  },
  DF_WellFill: {
    type: "fill",
    order: 0,
    paint: {
      "fill-color": "#ccc"
    }
  },
  DF_MultiConduitOrange: {
    type: "fill",
    order: 1,
    paint: {
      "fill-color": colorMap["ORANGE"]
    }
  },
  DF_BigConduitRed: {
    type: "fill",
    order: 1,
    paint: {
      "fill-color": colorMap["RED"]
    }
  },
  DF_InnerConduitBlue: {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["BLUE"]
    }
  },
  DF_InnerConduitOrange: {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["ORANGE"]
    }
  },
  DF_InnerConduitGreen: {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["GREEN"]
    }
  },
  DF_InnerConduitBrown: {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["BROWN"]
    }
  },
  DF_InnerConduitGrey: {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["GREY"]
    }
  },
  DF_InnerConduitWhite: {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["WHITE"]
    }
  },
  DF_InnerConduitRed: {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["RED"]
    }
  },
  DF_InnerConduitBlack: {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["BLACK"]
    }
  },
  DF_InnerConduitYellow: {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["YELLOW"]
    }
  },
  DF_InnerConduitViolet: {
    type: "fill",
    order: 2,
    paint: {
      "fill-color": colorMap["VIOLET"]
    }
  },
  DF_CableInsideWell: {
    type: "line",
    order: 3,
    paint: {
      "line-width": 2,
      "line-color": "#000"
    }
  },
  DF_CableOutsideWell: {
    type: "line",
    order: 3,
    paint: {
      "line-width": 2,
      "line-color": "#000"
    }
  },
  DF_CableOutsideWellLabel: {
    type: "symbol",
    order: 4,
    paint: {
      "text-halo-width": 2,
      "text-color": "#444",
      "text-halo-color": "#fff"
    },
    layout: {
      "symbol-placement": "line-center",
      "text-size": 10,
      "text-font": ["PT Sans Narrow Bold","Arial Unicode MS Regular"],
      "text-field": ["get", "label"],
      "text-allow-overlap": true,
      "icon-padding": 0,
    }
  },
  DF_CableInsideWellLabel: {
    type: "symbol",
    order: 4,
    paint: {
      "text-halo-width": 2,
      "text-color": "#444",
      "text-halo-color": "#fff"
    },
    layout: {
      "symbol-placement": "line-center",
      "text-size": 10,
      "text-font": ["PT Sans Narrow Bold","Arial Unicode MS Regular"],
      "text-field": ["get", "label"],
    }
  },
  default: {
    type: "line",
    paint: {
      "line-width": 3,
      "line-color": "#000"
    }
  }
};
