export const nodesLayer = (features) => {
  return ({
    id: "featureNodes",
    type: "symbol",
    layout: {
      "icon-image": "{icon}",
      "icon-allow-overlap": true
    },
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features
      }
    }
  })
};