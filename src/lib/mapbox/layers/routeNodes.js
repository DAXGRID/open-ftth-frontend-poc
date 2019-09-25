export const routeNodesLayer = (features, layerID) => {
  return {
    id: layerID,
    type: "symbol",
    layout: {
      "icon-image": "{icon}",
      "icon-allow-overlap": true,
      "text-field": ["get", "name"],
      "text-variable-anchor": ["top", "bottom", "right", "left"],
      "text-radial-offset": 1.5,
      "text-justify": "auto",
      "text-size": { // hide at certain zoom levels
        "stops": [
            [0, 0],
            [17.9, 0],
            [18, 10]
        ]
      }
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
