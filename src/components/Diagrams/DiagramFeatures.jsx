import React from "react";
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

import {
  isCable,
  isInnerConduit,
  isClosure,
  isOuterConduit
} from "./FeatureLogic";

const DiagramFeatures = ({ map }) => {
  const selectedFeatures = React.useRef([]);
  const [layers, setLayers] = React.useState([]);
  const sourceID = "diagramFeatures";
  const { setClickEvent } = React.useContext(ClickContext);
  const {
    loadingDiagram,
    setLoadingDiagram,
    diagramFeatures,
    selectedDiagramFeatures,
    setSelectedDiagramFeatures
  } = React.useContext(DiagramContext);

  React.useEffect(() => {
    if (!map || !diagramFeatures) return;

    map.on("load", () => {
      if (
        !loadingDiagram &&
        diagramFeatures.length > 0 &&
        layers.length === 0
      ) {
        setLoadingDiagram(true);
        loadFeatures();
      }
    });
  }, [map, diagramFeatures]);

  React.useLayoutEffect(() => {
    if (!map || !layers || layers.length === 0) {
      return;
    }
      setupOnMousemove();
      setupOnClick();
  }, [map, layers]);

  React.useEffect(() => {
    if (map) {
      map.resize();
    }

    return () => {
      if (map && map.loaded() && layers.length > 0) {
        setLayers([]);
        resetLayers();
      }
    };
  }, [map]);

  React.useEffect(() => {
    if (
      map &&
      map.loaded() &&
      diagramFeatures.length &&
      map.getSource(sourceID)
    ) {
      // todo reset when loading new, reset selected
      map.getSource(sourceID).setData({
        type: "FeatureCollection",
        features: []
      });

      map.getSource(sourceID).setData({
        type: "FeatureCollection",
        features: diagramFeatures
      });
      setLoadingDiagram(false);
    }
  }, [map, diagramFeatures]);

  React.useLayoutEffect(() => {
    // being called too many times, fix later
    if (selectedDiagramFeatures.length > 0) {
      return;
    }
    if (map && !loadingDiagram && layers.length > 0) {
      fitBounds(map, diagramFeatures, 30);
    }
  });

  React.useLayoutEffect(() => {
    if (loadingDiagram) {
      setClickEvent();
      selectedFeatures.current = [];
      setSelectedDiagramFeatures([]);
      clearHighlights();
    }
  }, [loadingDiagram]);

  const resetLayers = () => {
    if (layers && layers.length > 0) {
      _.each(
        [
          ...layers,
          { id: "selected0" },
          { id: "selected1" },
          { id: "selectedLabel0" },
          { id: "selectedLabel1" }
        ],
        layer => {
          if (map.getLayer(layer.id)) {
            map.removeLayer(layer.id);
          }
        }
      );
    }

    if (map.getSource(sourceID)) {
      map.removeSource(sourceID);
    }

    setLayers();
  };

  const loadFeatures = () => {
    let _layers = [];

    addSource();
    _layers = parseLayersFromFeatures();
    addLayers(_layers);
    setLayers(_layers);
    map.resize();
    setLoadingDiagram(false);
  };

  const parseLayersFromFeatures = () => {
    let _layers = [];

    _.each(diagramFeatures, feature => {
      feature.properties.layers.map(layer => {
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
  };

  const addSource = () => {
    if (map.getSource(sourceID)) return;
    map.addSource(sourceID, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: diagramFeatures
      }
    });
  };

  const addLayers = _layers => {
    _.each(_layers, layer => {
      map.addLayer(layer);
    });
  };

  const setupOnMousemove = () => {
    const layerIDs = layers.map(layer => layer.id);

    map.on("mousemove", e => {
      const feature = getFeatureFromEvent(map, e, layerIDs);
      if (feature) {
        map.getCanvas().style.cursor = "pointer";
      } else {
        map.getCanvas().style.cursor = "";
      }
    });
  };

  const setupOnClick = () => {
    const layerIDs = layers.map(layer => layer.id);

    map.on("click", e => {
      const feature = getFeatureFromEvent(map, e, layerIDs);
      if (!feature) {
        setClickEvent();
        selectedFeatures.current = [];
        setSelectedDiagramFeatures([]);
        clearHighlights();
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
      const index = selectedFeatures.current.length - 1

      if (!feature.properties.featureType.includes("Label")) {
        map.addLayer(
          selectedDiagramFeatureLayer(feature, "selected" + index)
        );
      }

      if (feature.properties.label) {
        map.addLayer(
          selectedDiagramLabelLayer(feature, "selectedLabel" + index)
        );
      }
    });
  };

  const canSelectAdditional = (selectedFeatures, feature) => {
    if (selectedFeatures.length >= 2) {
      return false;
    }

    if (selectedFeatures.length === 0) {
      return true;
    }

    const prevFeatue = selectedFeatures[0];

    if (prevFeatue.properties.refId === feature.properties.refId) {
      return false;
    }

    if (isInnerConduit(feature) && isInnerConduit(prevFeatue)) {
      return true;
    }

    if (
      (isInnerConduit(feature) && isOuterConduit(prevFeatue)) ||
      (isOuterConduit(feature) && isInnerConduit(prevFeatue))
    ) {
      return true;
    }

    if (
      (isInnerConduit(feature) && isCable(prevFeatue)) ||
      (isInnerConduit(prevFeatue) && isCable(feature))
    ) {
      return true;
    }

    if (
      (isOuterConduit(feature) && isClosure(prevFeatue)) ||
      (isOuterConduit(prevFeatue) && isClosure(feature))
    ) {
      return true;
    }

    return false;
  };

  const clearHighlights = () => {
    removeHighlight(map, "selected0");
    removeHighlight(map, "selected1");

    removeHighlight(map, "selectedLabel0");
    removeHighlight(map, "selectedLabel1");
  };

  return <></>;
};
export default DiagramFeatures;
