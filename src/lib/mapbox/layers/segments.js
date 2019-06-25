export const segmentsLayer = (features) => {
  return ({
    id: "featureSegments",
    type: "line",
    paint: {
      "line-width": ["get", "lineWidth"],
      "line-color": ["get", "lineColor"],
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