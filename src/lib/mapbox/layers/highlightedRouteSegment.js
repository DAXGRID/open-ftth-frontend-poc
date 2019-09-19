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
      "line-color": "#00ffff"
    }
  };
};
