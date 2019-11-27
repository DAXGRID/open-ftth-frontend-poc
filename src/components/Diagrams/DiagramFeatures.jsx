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
import {
  isCable,
  isInnerConduit,
  isClosure,
  isOuterConduit
} from "./FeatureLogic";

const DiagramFeatures = ({
  map,
  features,
  currentDiagramFeatures,
  setCurrentDiagramFeatures
}) => {
  const [layers, setLayers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const sourceID = "diagramFeatures";
  const { setClickEvent } = React.useContext(
    ClickContext
  );

  React.useEffect(() => {
    if (!map || !features) return;

    map.on("load", () => {
      if (!loading && layers.length === 0) {
        setLoading(true);
        loadFeatures();
      }
    });
  }, [map, features]);

  React.useEffect(() => {
    if (!map || !layers) {
      return;
    }

    setupOnMousemove();
    setupOnClick();
  }, [map, layers]);

  React.useEffect(() => {
    return () => {
      if (map && map.loaded() && layers.length > 0) {
        setLayers([]);
        resetLayers();
      }
    };
  }, [map]);

  React.useLayoutEffect(() => {
    // being called too many times, fix later
    if (currentDiagramFeatures.length > 0) {
      return;
    }
    if (map && !loading && layers.length > 0) {
      fitBounds(map, features, 30);
    }
  });

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
    setLoading(false);
  };

  const parseLayersFromFeatures = () => {
    let _layers = [];

    _.each(features, feature => {
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
    map.addSource(sourceID, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features
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
    var selectedFeatures = [];

    map.on("click", e => {
      const feature = getFeatureFromEvent(map, e, layerIDs);
      if (!feature) {
        setClickEvent()

        clearHighlights();
        return;
      }
      setClickEvent(e.originalEvent)

      if (!canSelectAdditional(selectedFeatures, feature)) {
        // reset selectedFeatures
        clearHighlights();
        selectedFeatures = [feature];
      } else {
        selectedFeatures = [...selectedFeatures, feature];
      }

      setCurrentDiagramFeatures(selectedFeatures);

      selectedFeatures.map((feature, index) => {
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
