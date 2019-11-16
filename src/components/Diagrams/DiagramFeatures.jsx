import React from "react";
import _ from "lodash";
import { getFeatureFromEvent } from "lib/mapbox/getUtils";
import { diagramFeatureLayer } from "lib/mapbox/layers/diagramFeatures";
import { removeHighlight } from "lib/mapbox/highlightRouteFeature";

const DiagramFeatures = ({ map, features }) => {
  const [layers, setLayers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const sourceID = "diagramFeatures";

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
        resetLayers();
      }
    };
  }, [map]);

  const resetLayers = () => {
    if (layers && layers.length > 0) {
      _.each(
        [...layers, { id: "selected" }, { id: "selectedLabel" }],
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

    console.log("features");
    console.log(features);
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
          styleLabel: feature.properties.style
        });

        if (!_layers.map(layer => layer.id).includes(newLayer.id)) {
          _layers.push(newLayer);
        }
      });
    });

    return _layers.sort((a, b) => a.order > b.order);
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

    map.on("click", e => {
      clearHighlights();
      const feature = getFeatureFromEvent(map, e, layerIDs);
      console.log("clicked feature")
      console.log(feature)
      if (!feature) return;

      if (!feature.properties.style.includes("Label")) {
        map.addLayer({
          id: "selected",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: feature.geometry,
              properties: feature.properties
            }
          },
          paint: {
            "line-width": 3,
            "line-color": "#71D3FC"
          }
        });
      }

      if (feature.properties.label) {
        map.addLayer({
          id: "selectedLabel",
          type: "symbol",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: feature.geometry,
              properties: feature.properties
            }
          },
          paint: {
            "text-halo-width": 2,
            "text-color": "#54A1C1",
            "text-halo-color": "#fff"
          },
          layout: {
            "symbol-placement": "line-center",
            "text-size": 10,
            "text-font": ["PT Sans Narrow Bold", "Arial Unicode MS Regular"],
            "text-field": ["get", "label"]
          }
        });
      }
    });
  };

  const clearHighlights = () => {
    removeHighlight(map, "selected");
    removeHighlight(map, "selectedLabel");
  };

  return <></>;
};
export default DiagramFeatures;
