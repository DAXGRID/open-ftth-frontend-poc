import React from "react";
import MapboxDiagram from "./MapboxDiagram";
import DiagramActions from "./DiagramActions";
import { Col, Nav, NavItem, Tab, Row } from "react-bootstrap";

const ClosureDiagram = ({ features, currentFeature }) => {
  const [parsedFeatures, setParsedFeatures] = React.useState();
  const [currentDiagramFeatures, setCurrentDiagramFeatures] = React.useState(
    []
  );

  const longitude = 0.012;
  const latitude = 0.012;
  const config = {
    container: "mapbox-diagram-map",
    center: [longitude, latitude],
    zoom: 13,
    minZoom: 12,
    style: "mapbox://styles/tamimitchell/ck2txin690msp1co4tt0aiahp"
  };

  React.useEffect(() => {
    console.log("currentFeature")

    console.log(currentFeature)
    console.log("features");
    console.log(features);
    setParsedFeatures(
      features.map(feature => {
        let parsedFeature = feature;

        parsedFeature.properties = {
          oldCoords: feature.geometry.coordinates,
          featureType: feature.style,
          label: feature.label,
          refId: feature.refId,
          refClass: feature.refClass,
          layers: [
            {
              layerID: "DF_" + feature.style
            }
          ]
        };

        if (parsedFeature.style === "Well") {
          parsedFeature.properties.layers.push({
            layerID: "DF_WellFill"
          });
        }

        if (parsedFeature.style === "CableInsideWell") {
          parsedFeature.properties.layers.push({
            layerID: "DF_CableInsideWellLabel"
          });
        }

        if (parsedFeature.style === "CableOutsideWell") {
          parsedFeature.properties.layers.push({
            layerID: "DF_CableOutsideWellLabel"
          });
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
        <>
            <DiagramActions
              currentDiagramFeatures={currentDiagramFeatures}
              currentFeature={currentFeature}
              setCurrentDiagramFeatures={setCurrentDiagramFeatures}
            />
            <MapboxDiagram
              config={config}
              features={parsedFeatures}
              currentDiagramFeatures={currentDiagramFeatures}
              setCurrentDiagramFeatures={setCurrentDiagramFeatures}
            />
        </>
      )}
    </>
  );
};

export default ClosureDiagram;
