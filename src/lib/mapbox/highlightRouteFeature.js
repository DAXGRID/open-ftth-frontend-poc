import { highlightedRouteNodeLayer } from "./layers/highlightedRouteNode";
import { highlightedRouteSegmentLayer } from "./layers/highlightedRouteSegment";

const highlightRouteFeature = (map, feature, layerID) => {
  if (!map || !map.isStyleLoaded()) return;

  const type = feature.layer.type;
  if (type === "symbol") {
    addHighlightedNodeLayer(map, feature, layerID);
  } else if (type === "line") {
    addHighlightedSegmentLayer(map, feature, layerID);
  }
};

export default highlightRouteFeature;

const addHighlightedNodeLayer = (map, node, layerID) => {
  map.addLayer(highlightedRouteNodeLayer(node, layerID));
};

const addHighlightedSegmentLayer = (map, segment, layerID) => {
  map.addLayer(highlightedRouteSegmentLayer(segment, layerID));
};
