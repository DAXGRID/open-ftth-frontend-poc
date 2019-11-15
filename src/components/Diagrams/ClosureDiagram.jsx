import React from "react";
import MapboxDiagram from "./MapboxDiagram";

const ClosureDiagram = ({ features }) => {
  const [parsedfeatures, setParsedFeatures] = React.useState();

  const longitude = 0.012;
  const latitude = 0.012;
  const config = {
    container: "mapbox-diagram-map",
    center: [longitude, latitude],
    zoom: 12.5,
    minZoom: 12.5,
    style: "mapbox://styles/tamimitchell/ck2txin690msp1co4tt0aiahp"
  };

  React.useEffect(() => {
    if (!features || parsedfeatures) {
      return;
    }
    setParsedFeatures(
      features.map(feature => {
        let parsedFeature = feature;

        parsedFeature.properties = {
          oldCoords: feature.geometry.coordinates,
          layerID: "diagramFeatures" + feature.style,
          style: feature.style
        };

        if (typeof feature.geometry.coordinates === "string") {
          parsedFeature.geometry.coordinates = JSON.parse(
            feature.geometry.coordinates
          );
        }

        return parsedFeature;
      })
    );
  }, [features]);

  return (
    <>
      {parsedfeatures && <MapboxDiagram config={config} features={parsedfeatures} />}
    </>
  )
};

export default ClosureDiagram;
