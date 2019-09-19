export const routeSegmentsLayer = (features, layerID) => {
  return {
    id: layerID,
    type: "line",
    paint: {
      "line-width": 3,
      "line-color": ["get", "lineColor"]
    },
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features
      }
    }
  };
};

export const routeSegmentLabelsLayer = features => {
  return {
    id: "routeSegmentLabels",
    type: "symbol",
    layout: {
      "symbol-placement": "line",
      "symbol-spacing": 1,
      "text-size": 10,
      "text-field": "{name}", // TODO populate this with children conduit names?
      "text-allow-overlap": true
    },
    paint: {
      // "text-color": "#ff0000",
    },
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features
      }
    }
  };
};
