import React from "react";
import MapboxDiagram from "./MapboxDiagram";

const ClosureDiagram = ({ features }) => {
  const [parsedFeatures, setParsedFeatures] = React.useState();

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
    if (!features || parsedFeatures) {
      return;
    }
    setParsedFeatures(
      features.map(feature => {
        let parsedFeature = feature;

        parsedFeature.properties = {
          oldCoords: feature.geometry.coordinates,
          style: feature.style,
          layers: [
            {
              layerID: "DF_" + feature.style
            }
          ]
        };

        if (parsedFeature.style === "Well") {
          parsedFeature.properties.layers.push({
            layerID: "DF_WellFill"
          })
        }

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
      {parsedFeatures && (
        <MapboxDiagram config={config} features={parsedFeatures} />
      )}
    </>
  );
};

export default ClosureDiagram;
