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

import { canSelectAdditional } from "./FeatureLogic";

const DiagramFeatures = ({ map }) => {
  const selectedFeatures = React.useRef([]);
  const [layers, setLayers] = React.useState([]);
  const [initialLoad, setInitialLoad] = React.useState(true);

  const sourceID = "diagramFeatures";
  const { setClickEvent } = React.useContext(ClickContext);
  const {
    loadingDiagram,
    setLoadingDiagram,
    diagramFeatures,
    selectedDiagramFeatures,
    setSelectedDiagramFeatures
  } = React.useContext(DiagramContext);

  // diagramFeatures initial load - initialize map source & features
  React.useEffect(() => {
    if (!map || !diagramFeatures || !initialLoad) return;

    const loadFeatures = () => {
      addSource();
      addLayers();
      map.resize();
      fitBounds(map, diagramFeatures, 30);
      setLoadingDiagram(false);
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

    const addLayers = () => {
      const _layers = parseLayersFromFeatures();

      _.each(_layers, layer => {
        map.addLayer(layer);
      });
      setLayers(_layers);
    };

    const parseLayersFromFeatures = () => {
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
    };

    map.on("load", () => {
      if (diagramFeatures.length > 0 && layers.length === 0) {
        setInitialLoad(false);
        console.log("initial map load");
        setLoadingDiagram(true);
        loadFeatures();
      }
    });
  }, [map, diagramFeatures, initialLoad, layers, setLoadingDiagram]);

  React.useLayoutEffect(() => {
    if (!map || !layers || layers.length === 0) {
      return;
    }

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
    };
  
    setupOnMousemove();
    setupOnClick();
  }, [map, layers]);

  React.useEffect(() => {
    if (map && map.loaded()) {
      map.resize();
    }
  }, [map]);

  React.useEffect(() => {
    return () => {
      console.log("unloading");
      setLoadingDiagram();
      setSelectedDiagramFeatures([]);
      if (map && map.loaded() && layers.length > 0) {
        resetLayers();
      }
    };
  }, []);

  React.useEffect(() => {
    if (
      map &&
      map.loaded() &&
      diagramFeatures.length &&
      map.getSource(sourceID)
    ) {
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
      // fitBounds(map, diagramFeatures, 30);
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
      console.log("resetting layers");

      _.each(
        [
          ...layers,
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

    if (map.getSource(sourceID)) {
      map.removeSource(sourceID);
    }

    setLayers([]);
  };


  const clearHighlights = () => {
    removeHighlight(map, "selected0");
    removeHighlight(map, "selected1");
    removeHighlight(map, "selected2");

    removeHighlight(map, "selectedLabel0");
    removeHighlight(map, "selectedLabel1");
    removeHighlight(map, "selectedLabel2");
  };

  return <></>;
};
export default DiagramFeatures;
