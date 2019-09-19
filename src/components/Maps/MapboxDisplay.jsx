import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import addUneditableFeatures from "lib/mapbox/addUneditableFeatures";
import addEditableFeatures from "lib/mapbox/addEditableFeatures";
import highlightRouteFeature from "lib/mapbox/highlightRouteFeature";
import CurrentFeatureContext from "hooks/CurrentFeatureContext.jsx";
import { getFeaturesFromEvent } from "../../lib/draw/getUtils";

const MapboxDisplay = ({
  config,
  uneditableFeatures,
  editableFeatures,
  editableFeatureTypes
}) => {
  const [map, setMap] = React.useState();
  const routeNodesID = "routeNodesID";
  const routeSegmentsID = "routeSegmentsID";
  const drawEnabled = editableFeatures && editableFeatureTypes;
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

  // not sure why it wants to include functions
  // eslint-disable-next-line 
  }, [map]);

  React.useEffect(() => {
    highlightRouteFeature(map, highlightedFeature);
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
        routeSegmentsID
      });

      if (drawEnabled) {
        addEditableFeatures(map, editableFeatures);
        // configureDraw(map, props);
      }
    });
  };

  const setupOnMousemove = map => {
    if (!map) return;

    const layers = [routeSegmentsID, routeNodesID];

    map.on("mousemove", e => {
      const features = getFeaturesFromEvent( map, e, layers );
      if (features.length > 0) {
        map.getCanvas().style.cursor = "pointer";
      } else {
        map.getCanvas().style.cursor = "";
      }
    });
  };

  const setupOnClick = map => {
    if (!map) return;
    const highlightedLayerID = "highlightedFeature";

    map.on("click", e => {
      // clear old highlight if there is one, or we deselected
      const mapLayer = map.getLayer(highlightedLayerID);
      if (typeof mapLayer !== "undefined") {
        map.removeLayer(highlightedLayerID).removeSource(highlightedLayerID);
        return;
      }
    });

    map.on("click", routeSegmentsID, e => {
      const feature = e.features[0];
      console.log("clicked segment");
      console.log(e.features);
      highlightRouteFeature(map, feature, highlightedLayerID);
      setCurrentFeatureID({ id: feature.properties.id, type: "segment" });
    });

    map.on("click", routeNodesID, e => {
      const feature = e.features[0];
      console.log("clicked node");
      console.log(e.features);
      highlightRouteFeature(map, feature, highlightedLayerID);
      setCurrentFeatureID({ id: feature.properties.id, type: "node" });
    });
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id={config.container} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default MapboxDisplay;
