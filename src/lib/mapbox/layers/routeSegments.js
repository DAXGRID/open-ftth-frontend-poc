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

export const routeSegmentLabelsLayer = (features, layerID) => {
  return {
    id: layerID,
    type: "symbol",
    layout: {
      "symbol-placement": "point",
      "text-justify": "left",
      "text-variable-anchor": ["left", "right", "top", "bottom"],
      "text-radial-offset": 1.5,
      "text-max-width": 20,
      "text-line-height": 1.2,
      "text-size": { // hide at certain zoom levels to match nodes
        "stops": [
            [0, 0],
            [17.9, 0],
            [18, 10]
        ]
      },
      "text-field": ["get", "name"],
      // "text-allow-overlap": true
    },
    paint: {
      "text-halo-width": 5,
      "text-color": "#202",
      "text-halo-color": "#fff",
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
