const layerID = "highlightedNode";

const highlightNode = (map, highlightedNode) => {
  if (!map || !map.isStyleLoaded()) return;

  const mapLayer = map.getLayer(layerID);
  // clear old node if there is one, or we deselected
  if (typeof mapLayer !== "undefined" || !highlightedNode) {
    map.removeLayer(layerID).removeSource(layerID);
  }

  if (!highlightedNode) return;
  console.log("highlightedNode");

  console.log(highlightedNode);
  addHighlightedNodeLayer(map, highlightedNode);
};

export default highlightNode;

const addHighlightedNodeLayer = (map, highlightedNode) => {
  map.addLayer({
    id: layerID,
    type: "symbol",
    source: {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: highlightedNode.geometry,
        properties: highlightedNode.properties
      }
    },
    layout: {
      "icon-image": "{iconHover}",
      "icon-allow-overlap": true,
      "icon-size": {
        stops: [[10, 0.3], [13, 0.5], [17, 1.25], [20, 3]]
      }
    }
  });
};
