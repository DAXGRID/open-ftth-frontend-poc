import { highlightedRouteNodeLayer } from "./layers/highlightedRouteNode";
import { highlightedRouteSegmentLayer, highlightedRouteSegmentsLayer } from "./layers/highlightedRouteSegment";

const highlightRouteFeature = (map, feature, layerID) => {
  if (!map || !map.isStyleLoaded()) return;

  const mapLayer = map.getLayer(layerID);
  if (typeof mapLayer !== "undefined") {
    map.removeLayer(layerID).removeSource(layerID);
    return;
  }

  if (feature.layer && feature.layer.type === "symbol") {
    addHighlightedNodeLayer(map, feature, layerID);
  } else if (feature.layer && feature.layer.type === "line") {
    addHighlightedSegmentLayer(map, feature, layerID);
  } else if (feature.lineConduitSegments) {
    addHighlightedSegmentsLayer(map, feature.lineConduitSegments, layerID);
  }
};

export default highlightRouteFeature;


export const removeHighlight = (map, layerID) => {
  if (!map || !map.isStyleLoaded()) return;
  const mapLayer = map.getLayer(layerID);

  if (typeof mapLayer !== "undefined") {
    map.removeLayer(layerID).removeSource(layerID);
  }
}

const addHighlightedNodeLayer = (map, node, layerID, underLayerID) => {
  map.addLayer(highlightedRouteNodeLayer(node, layerID));
};

const addHighlightedSegmentLayer = (map, segment, layerID, underLayerID) => {
  map.addLayer(highlightedRouteSegmentLayer(segment, layerID), underLayerID);
};

const addHighlightedSegmentsLayer = (map, segments, layerID, underLayerID) => {
  map.addLayer(highlightedRouteSegmentsLayer(segments, layerID), underLayerID);
};