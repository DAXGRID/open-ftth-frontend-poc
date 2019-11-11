import React from "react";
import _ from "lodash";
import { getFeatureFromEvent } from "lib/mapbox/getUtils";
import { diagramFeatureLayer } from "lib/mapbox/layers/diagramFeatures";
import { removeHighlight } from "lib/mapbox/highlightRouteFeature";

const DiagramFeatures = ({ map, features }) => {
  let layers = [];

  React.useEffect(() => {
    if (!map || !features) return;

    map.on("load", () => {
      loadFeatures();
      setupOnMousemove();
      setupOnClick();
    });
  }, [map, features]);

  const loadFeatures = () => {
    console.log("diagram features");
    console.log(features);

    map.addSource("diagramFeatures", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features
      }
    });

    features
      .filter(feature => {
        if (!layers.includes(feature.properties.layerID)) {
          return layers.push(feature.properties.layerID);
        }
      })
      .sort((a, b) => a.properties.order > b.properties.order)
      .map(feature => {
        map.addLayer(
          diagramFeatureLayer({
            layerID: feature.properties.layerID,
            source: "diagramFeatures",
            styleLabel: feature.properties.style
          })
        );
      });
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
      console.log("clicked feature");
      console.log(feature);

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
