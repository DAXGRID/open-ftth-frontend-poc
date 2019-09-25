export const highlightedRouteSegmentLayer = (feature, layerID) => {
  return {
    id: layerID,
    type: "line",
    source: {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: feature.geometry,
        properties: feature.properties
      }
    },
    paint: {
      "line-width": 3,
      "line-color": "#71D3FC"
    }
  };
};

export const highlightedRouteSegmentsLayer = (features, layerID) => {
  return {
    id: layerID,
    type: "line",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features
      }
    },
    paint: {
      "line-width": 3,
      "line-color": ["get", "lineColor"]
    }
  };
};
