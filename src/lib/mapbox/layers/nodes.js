export const nodesLayer = features => {
  return {
    id: "featureNodes",
    type: "symbol",
    layout: {
      "icon-image": "{icon}",
      "icon-allow-overlap": true,
      "icon-size": {
        stops: [[10, 0.3], [13, 0.5], [17, 1.25], [20, 3]]
      }
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
