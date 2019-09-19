import { routeNodesLayer } from "./layers/routeNodes";
import { routeSegmentsLayer } from "./layers/routeSegments";

const addUneditableFeatures = ({
  map,
  uneditableFeatures,
  routeNodesID,
  routeSegmentsID
}) => {
  if (!map || !uneditableFeatures) return;

  // draw nodes after segments so they are on top
  if (uneditableFeatures.segments) {
    map.addLayer(routeSegmentsLayer(uneditableFeatures.segments, routeSegmentsID));
  }

  if (uneditableFeatures.nodes) {
    map.addLayer(routeNodesLayer(uneditableFeatures.nodes, routeNodesID));
  }

};

export default addUneditableFeatures;
