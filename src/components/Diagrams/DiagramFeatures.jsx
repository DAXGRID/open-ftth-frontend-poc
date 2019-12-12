import React, { useCallback } from "react";
import _ from "lodash";
import { getFeatureFromEvent } from "lib/mapbox/getUtils";
import {
  diagramFeatureLayer,
  selectedDiagramFeatureLayer,
  selectedDiagramLabelLayer
} from "lib/mapbox/layers/diagramFeatures";
import { removeHighlight } from "lib/mapbox/highlightRouteFeature";
import { fitBounds } from "lib/mapbox/getUtils";
import ClickContext from "hooks/ClickContext";
import DiagramContext from "hooks/DiagramContext";

import { canSelectAdditional } from "./FeatureLogic";

const DiagramFeatures = ({ map, mapLoaded, sourceID, diagramFeatures }) => {
  const layers = React.useRef([]);
  const selectedFeatures = React.useRef([]);
  const { setClickEvent } = React.useContext(ClickContext);
  const {
    loadingDiagram,
    setLoadingDiagram,
    setSelectedDiagramFeatures
  } = React.useContext(DiagramContext);

  const parseLayersFromFeatures = useCallback(() => {
    let _layers = [];

    _.each(diagramFeatures, feature => {
      _.each(feature.properties.layers, layer => {
        const newLayer = diagramFeatureLayer({
          source: sourceID,
          layerID: layer.layerID,
          featureType: feature.properties.featureType
        });

        if (!_layers.map(layer => layer.id).includes(newLayer.id)) {
          _layers.push(newLayer);
        }
      });
    });

    return _.orderBy(_layers, ["order"], ["asc"]);
  }, [diagramFeatures, sourceID]);

  const addLayers = useCallback(() => {
    _.each(layers.current, layer => {
      if (!map.getLayer(layer.id)) {
        map.addLayer(layer);
      }
    });
  }, [map, layers]);

  const layerIDs = useCallback(() => {
    return layers.current ? layers.current.map(layer => layer.id) : [];
  }, [layers]);

  const setupOnMousemove = useCallback(() => {
    if (!layerIDs()) return;

    map.on("mousemove", e => {
      const feature = getFeatureFromEvent(map, e, layerIDs());
      if (feature) {
        map.getCanvas().style.cursor = "pointer";
      } else {
        map.getCanvas().style.cursor = "";
      }
    });
  }, [map, layerIDs]);

  const clearHighlights = useCallback(() => {
    removeHighlight(map, "selected0");
    removeHighlight(map, "selected1");
    removeHighlight(map, "selected2");

    removeHighlight(map, "selectedLabel0");
    removeHighlight(map, "selectedLabel1");
    removeHighlight(map, "selectedLabel2");
  }, [map]);

  const setupOnClick = useCallback(() => {
    if (!layerIDs()) return;

    map.on("click", e => {
      const feature = getFeatureFromEvent(map, e, layerIDs());
      if (!feature) {
        setClickEvent();
        clearHighlights();
        selectedFeatures.current = [];
        return;
      }
      setClickEvent(e.originalEvent);
      if (!canSelectAdditional(selectedFeatures.current, feature)) {
        // reset selectedFeatures
        clearHighlights();
        selectedFeatures.current = [feature];
      } else {
        selectedFeatures.current = [...selectedFeatures.current, feature];
      }

      setSelectedDiagramFeatures(selectedFeatures.current);
      const index = selectedFeatures.current.length - 1;

      if (!feature.properties.featureType.includes("Label")) {
        // Belt & suspenders because clearHighlights isn't enough after a mutation for some reason
        const layerID = "selected" + index;
        const mapLayer = map.getLayer(layerID);

        if (typeof mapLayer !== "undefined") {
          map.removeLayer(layerID).removeSource(layerID);
        }
        map.addLayer(selectedDiagramFeatureLayer(feature, layerID));
      }

      if (feature.properties.label) {
        // Belt & suspenders because clearHighlights isn't enough after a mutation for some reason
        const layerID = "selectedLabel" + index;
        const mapLayer = map.getLayer(layerID);

        if (typeof mapLayer !== "undefined") {
          map.removeLayer(layerID).removeSource(layerID);
        }
        map.addLayer(selectedDiagramLabelLayer(feature, layerID));
      }
    });
  }, [
    clearHighlights,
    map,
    setClickEvent,
    setSelectedDiagramFeatures,
    layerIDs
  ]);

  const updateMapFeatures = useCallback(() => {
    if (map.getSource(sourceID)) {
      map.getSource(sourceID).setData({
        type: "FeatureCollection",
        features: diagramFeatures
      });
    }

    layers.current = parseLayersFromFeatures();
    addLayers();
  }, [diagramFeatures, map, addLayers, parseLayersFromFeatures, sourceID]);

  const loadFeatures = useCallback(() => {
    setLoadingDiagram(true);
    updateMapFeatures();
    map.resize();
    fitBounds(map, diagramFeatures, 30);
    setLoadingDiagram(false);
  }, [map, diagramFeatures, setLoadingDiagram, updateMapFeatures]);

  React.useEffect(() => {
    if (!map) return;
    loadFeatures();
    setupOnClick();
    setupOnMousemove();
    // No return/unload function for initial load/reload, it only causes render loops
  }, [map, diagramFeatures, loadFeatures, setupOnClick, setupOnMousemove]);

  React.useLayoutEffect(() => {
    if (loadingDiagram) {
      setClickEvent();
      clearHighlights();
      selectedFeatures.current = [];
      setSelectedDiagramFeatures([]);
    }
  }, [
    loadingDiagram,
    clearHighlights,
    setClickEvent,
    setSelectedDiagramFeatures
  ]);

  return <></>;
};
export default DiagramFeatures;
