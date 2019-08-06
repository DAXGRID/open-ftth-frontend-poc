export const segmentsLayer = features => {
  return {
    id: "featureSegments",
    type: "line",
    paint: {
      "line-width": ["get", "lineWidth"],
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

export const segmentLabelsLayer = features => {
  return {
    id: "featureSegmentLabels",
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
