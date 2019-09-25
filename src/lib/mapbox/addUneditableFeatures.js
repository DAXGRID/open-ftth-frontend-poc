import { routeNodesLayer } from "./layers/routeNodes";
import { routeSegmentsLayer, routeSegmentLabelsLayer } from "./layers/routeSegments";

const addUneditableFeatures = ({
  map,
  uneditableFeatures,
  routeNodesID,
  routeSegmentsID,
  routeSegmentLabelsID
}) => {
  if (!map || !uneditableFeatures) return;

  // draw nodes after segments so they are on top
  if (uneditableFeatures.segments) {
    map.addLayer(routeSegmentsLayer(uneditableFeatures.segments, routeSegmentsID));
    map.addLayer(routeSegmentLabelsLayer(uneditableFeatures.segments, routeSegmentLabelsID));
  }

  if (uneditableFeatures.nodes) {
    map.addLayer(routeNodesLayer(uneditableFeatures.nodes, routeNodesID));
  }

};

export default addUneditableFeatures;
