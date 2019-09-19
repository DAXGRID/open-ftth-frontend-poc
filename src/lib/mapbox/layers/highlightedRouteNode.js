export const highlightedRouteNodeLayer = (feature, layerID) => {
  return {
    id: layerID,
    type: "symbol",
    source: {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: feature.geometry,
        properties: feature.properties
      }
    },
    layout: {
      "icon-image": "{iconHover}",
      "icon-allow-overlap": true,
    }
  }
}