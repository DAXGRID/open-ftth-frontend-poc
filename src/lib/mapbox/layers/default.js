const defaultLayers = map => {
  map.addLayer({
    id: "features-segments",
    type: "line",
    source: "features",
    filter: ["all", ["==", "$type", "LineString"], ["!has", "physicalType"]],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        "#889",
        ["boolean", ["feature-state", "hover"], false],
        "#bbc",
        "#111"
      ],
      "line-width": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        5,
        ["boolean", ["feature-state", "hover"], false],
        5,
        2
      ]
    }
  });

  map.addLayer({
    id: "features-nodes",
    type: "circle",
    source: "features",
    filter: ["all", ["==", "$type", "Point"], ["!has", "physicalType"]],
    paint: {
      "circle-color": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        "#889",
        ["boolean", ["feature-state", "hover"], false],
        "#bbc",
        "#111"
      ],
      "circle-radius": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        6,
        ["boolean", ["feature-state", "hover"], false],
        6,
        3
      ]
    }
  });
};

export default defaultLayers;
