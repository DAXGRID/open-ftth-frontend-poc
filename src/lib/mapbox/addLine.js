const layerID = "highlightedFeature";

const addLine = ({ map, highlightedFeature }) => {
  if (!map || !map.isStyleLoaded()) return;

  const mapLayer = map.getLayer(layerID);
  // clear old line if there is one, or we deselected
  if (typeof mapLayer !== "undefined" || !highlightedFeature) {
    map.removeLayer(layerID).removeSource(layerID);
  }

  if (!highlightedFeature) return;
  addHighlightedLineLayer(map, highlightedFeature.lineConduitSegments);
};

export default addLine;

const addHighlightedLineLayer = (map, lineConduitSegments) => {
  console.log("lineConduitSegments");
  console.log(lineConduitSegments);
  map.addLayer({
    id: layerID,
    type: "line",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: lineConduitSegments
      }
    },
    paint: {
      "line-width": ["get", "lineWidth"],
      "line-color": ["get", "lineColor"]
    }
  });
};
