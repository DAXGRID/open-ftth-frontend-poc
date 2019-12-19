import React from "react";
import { getFeatureFromEvent } from "lib/mapbox/getUtils";
import CurrentFeatureContext from "hooks/CurrentFeatureContext.jsx";
import { routeNodesLayer } from "lib/mapbox/layers/routeNodes";
import {
  routeSegmentsLayer,
  routeSegmentLabelsLayer
} from "lib/mapbox/layers/routeSegments";
import highlightRouteFeature, {
  removeHighlight
} from "lib/mapbox/highlightRouteFeature";

const UneditableFeatures = ({ map, features }) => {
  const {
    highlightedFeature,
    setHighlightedFeature,
    setCurrentFeatureID
  } = React.useContext(CurrentFeatureContext);
  const layerIDs = {
    routeNodes: "routeNodes",
    routeSegments: "routeSegments",
    routeSegmentLabels: "routeSegmentLabels",
    highlightedLayer: "highlightedFeature",
    selectedLayer: "selectedFeature"
  };
  const selectableLayers = [
    layerIDs.routeNodes,
    layerIDs.routeSegments,
    layerIDs.routeSegmentLabels
  ];
  
  const clearSelected = React.useCallback(() => {
    removeHighlight(map, layerIDs.selectedLayer);
  },[layerIDs, map]);

  const clearHighlight = React.useCallback(() => {
    removeHighlight(map, layerIDs.highlightedLayer);
  },[layerIDs, map]);

  React.useEffect(() => {
    if (!map || !features) return;

    map.on("load", () => {
      const loadFeatures = () => {
        // draw nodes after segments so they are on top
        if (features.segments) {
          map.addLayer(
            routeSegmentsLayer(features.segments, layerIDs.routeSegments)
          );
          map.addLayer(
            routeSegmentLabelsLayer(features.segments, layerIDs.routeSegmentLabels)
          );
        }
    
        if (features.nodes) {
          map.addLayer(routeNodesLayer(features.nodes, layerIDs.routeNodes));
        }
      };
    
      const setupOnMousemove = () => {
        map.on("mousemove", e => {
          const feature = getFeatureFromEvent(map, e, selectableLayers);
          if (feature) {
            map.getCanvas().style.cursor = "pointer";
          } else {
            map.getCanvas().style.cursor = "";
          }
        });
      };
    
      const setupOnClick = () => {
        map.on("click", e => {
          clearSelected();
          setHighlightedFeature();
    
          let feature = getFeatureFromEvent(map, e, selectableLayers);
          if (!feature) return;
          const featureID = feature.properties.id;
          const featureType = feature.properties.dataType;
    
          // select segment by its label. Nodes do this automatically (same layer)
          if (feature.layer.id === layerIDs.routeSegmentLabels) {
            feature = map
              .queryRenderedFeatures({ layerIDs: [layerIDs.routeSegments] })
              .find(f => f.properties.id === featureID);
          }
          highlightRouteFeature(map, feature, layerIDs.selectedLayer);
          setCurrentFeatureID({ id: featureID, type: featureType });
        });
      };
    
      loadFeatures();
      setupOnMousemove();
      setupOnClick();
    });
  }, [map, features, clearHighlight, layerIDs, selectableLayers, setCurrentFeatureID, setHighlightedFeature, clearSelected]);

  // highlight features selected from info tab
  React.useEffect(() => {
    if (!map) return;

    clearHighlight();

    // clear highlights even if we didn't set one, for edit views
    if (!highlightedFeature) return;

    highlightRouteFeature(map, highlightedFeature, layerIDs.highlightedLayer);
  }, [map, highlightedFeature, clearHighlight, layerIDs]);

  return <></>;
};
export default UneditableFeatures;
