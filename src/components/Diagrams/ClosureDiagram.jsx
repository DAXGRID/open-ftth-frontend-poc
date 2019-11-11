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
      let coords;

      if (typeof feature.geometry.coordinates === "string") {
        coords = JSON.parse(feature.geometry.coordinates);
      } else {
        coords = feature.geometry.coordinates[0];
      }

      parsedFeature.properties = {
        oldCoords: feature.geometry.coordinates,
        layerID: "diagramFeatures" + feature.style,
        style: feature.style
      };
     
      parsedFeature.geometry.coordinates = coords;

      return parsedFeature;
    });
  };

  return <MapboxDiagram config={config} features={parsedFeatures()} />;
};

export default ClosureDiagram;
