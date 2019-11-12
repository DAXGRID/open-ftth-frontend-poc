import React from "react";
import MapboxDiagram from "./MapboxDiagram";
import ClosuresTab from "components/InfoPanel/Feature/ClosuresTab";

const ClosureDiagram = ({ features }) => {
  const longitude = 0.012;
  const latitude = 0.012;
  const config = {
    container: "mapbox-diagram-map",
    center: [longitude, latitude],
    zoom: 12.5,
    minZoom: 12.5,
    style: "mapbox://styles/tamimitchell/ck2txin690msp1co4tt0aiahp"
  };

  const parsedFeatures = () => {
    return features.map(feature => {
      let parsedFeature = feature;

      parsedFeature.properties = {
        oldCoords: feature.geometry.coordinates,
        layerID: "diagramFeatures" + feature.style,
        style: feature.style
      };

      if (typeof feature.geometry.coordinates === "string") {
        parsedFeature.geometry.coordinates = JSON.parse(feature.geometry.coordinates);
      }
     
      return parsedFeature;
    });
  };

  return <MapboxDiagram config={config} features={parsedFeatures()} />;
};

export default ClosureDiagram;
