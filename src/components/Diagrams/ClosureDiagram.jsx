import React from "react";
import LoadingOverlay from "react-loading-overlay";
import MapboxDiagram from "./MapboxDiagram";
import DiagramActions from "./DiagramActions";
import DiagramContext from "hooks/DiagramContext";
import useDiagramService from "hooks/useDiagramService";

const ClosureDiagram = ({ currentFeature, active }) => {
  const {
    setPointOfInterestID,
    setFeatureData,
    loadingDiagram,
    setLoadingDiagram
  } = React.useContext(DiagramContext);

  const { data, error, loading } = useDiagramService(
    currentFeature.id,
    loading
  );

  React.useEffect(() => {
    if (error) {
      console.error("Error Loading Item: ");
      console.error(error);
    }
  }, [error]);

  React.useEffect(() => {
    if (currentFeature) {
      setPointOfInterestID(currentFeature.id);
    }
  }, [currentFeature]);

  React.useEffect(() => {
    setLoadingDiagram(!!loading);
  }, [loading]);

  React.useEffect(() => {
    if (active && data && data.diagramService) {
      setFeatureData(data);
    } else {
      setFeatureData({});
    }
  }, [data]);

  const longitude = 0.012;
  const latitude = 0.012;
  const config = {
    container: "mapbox-diagram-map",
    center: [longitude, latitude],
    zoom: 13,
    minZoom: 12,
    style: "mapbox://styles/tamimitchell/ck2txin690msp1co4tt0aiahp"
  };

  return (
    <>
      <LoadingOverlay active={loadingDiagram} spinner text="Loading...">
        {!loading && data && (
          <>
            <DiagramActions />
            <MapboxDiagram config={config} />
          </>
        )}
      </LoadingOverlay>
    </>
  );
};

export default ClosureDiagram;
