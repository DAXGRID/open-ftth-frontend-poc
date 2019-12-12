import React from "react";
import _ from "lodash";

const useDiagramFeatures = () => {
  const [featureData, setFeatureData] = React.useState();
  const [diagramFeatures, setDiagramFeatures] = React.useState();

  React.useEffect(() => {
    if (!featureData || !featureData.diagramService) return;

    const _features =
      featureData.diagramService.buildRouteNodeDiagram.diagramObjects;
    const _parsedFeatures = _features.map(feature => {
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
    });

    const setFeatures = () => {
      setDiagramFeatures(_parsedFeatures);
    };

    const debouncedSetFeatures = _.debounce(setFeatures, 500, {
      leading: true,
      trailing: false
    });

    debouncedSetFeatures();
  }, [featureData]);

  return [diagramFeatures, setFeatureData];
};

const DiagramContext = React.createContext();
export default DiagramContext;

export const DiagramProvider = props => {
  const selectedFeatures = React.useRef([]);
  const [pointOfInterestID, setPointOfInterestID] = React.useState();
  const [diagramFeatures, setFeatureData] = useDiagramFeatures();
  const [loadingDiagram, setLoadingDiagram] = React.useState();
  const [selectedDiagramFeatures, setSelectedDiagramFeatures] = React.useState(
    []
  );

  return (
    <DiagramContext.Provider
      value={{
        pointOfInterestID,
        setPointOfInterestID,
        diagramFeatures,
        setFeatureData,
        selectedFeatures,
        selectedDiagramFeatures,
        setSelectedDiagramFeatures,
        loadingDiagram,
        setLoadingDiagram
      }}
    >
      {props.children}
    </DiagramContext.Provider>
  );
};
