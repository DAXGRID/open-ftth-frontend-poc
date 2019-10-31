import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import addUneditableFeatures from "lib/mapbox/addUneditableFeatures";
import addEditableFeatures from "lib/mapbox/addEditableFeatures";
import highlightRouteFeature, {
  removeHighlight
} from "lib/mapbox/highlightRouteFeature";
import CurrentFeatureContext from "hooks/CurrentFeatureContext.jsx";
import { getFeaturesFromEvent } from "../../lib/mapbox/draw/getUtils";

const MapboxDisplay = ({
  config,
  uneditableFeatures,
  editableFeatures
}) => {
  const [map, setMap] = React.useState();
  const routeNodesID = "routeNodes";
  const routeSegmentsID = "routeSegments";
  const routeSegmentLabelsID = "routeSegmentLabels";
  const highlightedLayerID = "highlightedFeature";
  const selectedLayerID = "selectedFeature";
  const drawEnabled = !!editableFeatures;
  const { highlightedFeature, setCurrentFeatureID } = React.useContext(
    CurrentFeatureContext
  );

  React.useLayoutEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MapboxAccessToken;
    setMap(new mapboxgl.Map(config));
  }, [config]);

  React.useEffect(() => {
    loadFeatures(map);
    setupOnMousemove(map);
    setupOnClick(map);

    // not sure why, but eslint wants us to include functions here
    // eslint-disable-next-line
  }, [map]);

  React.useEffect(() => {
    removeHighlight(map, selectedLayerID);
    removeHighlight(map, highlightedLayerID);

    highlightRouteFeature(map, highlightedFeature, highlightedLayerID);
  }, [map, highlightedFeature]);

  // Ideally the following functions would be imported for a cleaner file,
  // but we're using hooks that need to be in a React component, and they're
  // using logic that isn't allowed directly in the useEffect hooks.
  const loadFeatures = map => {
    if (!map || !uneditableFeatures) return;

    map.on("load", () => {
      addUneditableFeatures({
        map,
        uneditableFeatures,
        routeNodesID,
        routeSegmentsID,
        routeSegmentLabelsID
      });

      if (drawEnabled) {
        console.log("draw enabled")
        console.log(editableFeatures)

        addEditableFeatures({map, editableFeatures});
      }
    });
  };

  const setupOnMousemove = map => {
    if (!map) return;

    const layers = [routeSegmentsID, routeSegmentLabelsID, routeNodesID];

    map.on("mousemove", e => {
      const features = getFeaturesFromEvent(map, e, layers);
      if (features.length > 0) {
        map.getCanvas().style.cursor = "pointer";
      } else {
        map.getCanvas().style.cursor = "";
      }
    });
  };

  const setupOnClick = map => {
    if (!map) return;
    const layers = [routeSegmentsID, routeSegmentLabelsID, routeNodesID];

    map.on("click", e => {
      // clear old highlight if there is one, or we deselected
      removeHighlight(map, selectedLayerID);
      removeHighlight(map, highlightedLayerID);

      let feature;
      const nodeFeatures = getFeaturesFromEvent(map, e, layers);

      if (nodeFeatures.length > 0) {
        feature = nodeFeatures[0];
        const featureID = feature.properties.id;

        // select segment by its label. Nodes do this automatically (same layer)
        if (feature.layer.id === routeSegmentLabelsID) {
          feature = map
            .queryRenderedFeatures({ layers: [routeSegmentsID] })
            .find(f => f.properties.id === featureID);
        }

        console.log("clicked feature");
        console.log(feature);

        highlightRouteFeature(map, feature, selectedLayerID);
        setCurrentFeatureID({ id: featureID, type: feature.source });
      }
    });
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id={config.container} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default MapboxDisplay;
