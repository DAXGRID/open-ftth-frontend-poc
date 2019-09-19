export const routeNodesLayer = (features, layerID) => {
  return {
    id: layerID,
    type: "symbol",
    layout: {
      "icon-image": "{icon}",
      "icon-allow-overlap": true,
      "text-size": 10,
      "text-field": ["get", "name"],
      "text-variable-anchor": ["top", "bottom", "right", "left"],
      "text-radial-offset": 1.5,
      "text-justify": "auto"
    },
    paint: {
      "text-halo-width": 5,
      "text-color": "#202",
      "text-halo-color": "#fff"
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
