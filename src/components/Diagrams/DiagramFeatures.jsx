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

const DiagramFeatures = ({ map, diagramFeatures }) => {
  const sourceID = "diagramFeatures";
  const layers = React.useRef([]);
  const selectedFeatures = React.useRef([]);
  const [initialLoad, setInitialLoad] = React.useState(true);

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
  }, [diagramFeatures]);

  const addLayers = useCallback(() => {
    _.each(layers.current, layer => {
      map.addLayer(layer);
    });
  }, [map, layers]);

  const resetLayers = useCallback(() => {
    if (layers.current && layers.current.length > 0) {
      _.each(
        [
          ...layers.current,
          { id: "selected0" },
          { id: "selected1" },
          { id: "selected2" },
          { id: "selectedLabel0" },
          { id: "selectedLabel1" },
          { id: "selectedLabel2" }
        ],
        layer => {
          if (map.getLayer(layer.id)) {
            map.removeLayer(layer.id);
          }
        }
      );
    }

    layers.current = [];
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
      const index = selectedFeatures.current.length - 1;

      if (!feature.properties.featureType.includes("Label")) {
        map.addLayer(selectedDiagramFeatureLayer(feature, "selected" + index));
      }

      if (feature.properties.label) {
        map.addLayer(
          selectedDiagramLabelLayer(feature, "selectedLabel" + index)
        );
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
      resetLayers();
      map.getSource(sourceID).setData({
        type: "FeatureCollection",
        features: diagramFeatures
      });
      layers.current = parseLayersFromFeatures();
      addLayers();
    } else {
      map.addSource(sourceID, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: diagramFeatures
        }
      });
      addLayers();
    }
  }, [diagramFeatures, map, resetLayers, addLayers, parseLayersFromFeatures]);

  const loadFeatures = useCallback(() => {
    setLoadingDiagram(true);
    updateMapFeatures();
    map.resize();
    fitBounds(map, diagramFeatures, 30);
    setLoadingDiagram(false);
  }, [map, diagramFeatures, setLoadingDiagram, updateMapFeatures]);

  React.useEffect(() => {
    if (!map || !diagramFeatures) return;

    if (initialLoad) {
      setInitialLoad(false);
      map.on("load", () => {
        layers.current = parseLayersFromFeatures();

        loadFeatures();
        setupOnMousemove();
        setupOnClick();
      });
    } else {
      loadFeatures();
    }

    // No return/unload function for initial load/reload, it only causes render loops
  }, [
    map,
    diagramFeatures,
    parseLayersFromFeatures,
    loadFeatures,
    setupOnClick,
    setupOnMousemove,
    initialLoad
  ]);

  React.useLayoutEffect(() => {
    if (loadingDiagram) {
      setClickEvent();
      selectedFeatures.current = [];
      setSelectedDiagramFeatures([]);
      clearHighlights();
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
