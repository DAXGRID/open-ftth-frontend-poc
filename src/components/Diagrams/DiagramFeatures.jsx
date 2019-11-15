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
      _.each([...layers, "selected"], layer => {
        if (map.getLayer(layer)) {
          map.removeLayer(layer);
        }
      });
    }

    if (map.getSource(sourceID)) {
      map.removeSource(sourceID);
    }

    setLayers();
  };

  const loadFeatures = () => {
    let _layers = [];
    map.addSource(sourceID, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features
      }
    });

    features
      .filter(feature => {
        if (!_layers.includes(feature.properties.layerID)) {
          return _layers.push(feature.properties.layerID);
        }
      })
      .sort((a, b) => a.properties.order > b.properties.order)
      .map(feature => {
        map.addLayer(
          diagramFeatureLayer({
            layerID: feature.properties.layerID,
            source: sourceID,
            styleLabel: feature.properties.style
          })
        );
      });

    setLayers(_layers);
    setLoading(false);
  };

  const setupOnMousemove = () => {
    map.on("mousemove", e => {
      const feature = getFeatureFromEvent(map, e, layers);
      if (feature) {
        map.getCanvas().style.cursor = "pointer";
      } else {
        map.getCanvas().style.cursor = "";
      }
    });
  };

  const setupOnClick = () => {
    map.on("click", e => {
      clearHighlights();
      const feature = getFeatureFromEvent(map, e, layers);
      if (!feature) return;

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
    });
  };

  const clearHighlights = () => {
    removeHighlight(map, "selected");
    removeHighlight(map, "selected-fill");
  };

  return <></>;
};
export default DiagramFeatures;
