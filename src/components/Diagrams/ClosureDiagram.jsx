import React from "react";
import LoadingOverlay from "react-loading-overlay";
import MapboxDiagram from "./MapboxDiagram";
import DiagramActions from "./DiagramActions";
import DiagramContext from "hooks/DiagramContext";
import useDiagramService from "hooks/useDiagramService";
import { Alert } from "react-bootstrap";

const ClosureDiagram = ({ currentFeatureID, active }) => {
  const {
    setPointOfInterestID,
    setFeatureData,
    loadingDiagram,
    setLoadingDiagram
  } = React.useContext(DiagramContext);

  const { data, error, loading } = useDiagramService({
    id: currentFeatureID.id,
    type: currentFeatureID.type
  });

  React.useEffect(() => {
    if (error) {
      setLoadingDiagram(false);
      console.error("Error Loading Item: ");
      console.error(error.message);
    }
  }, [error, setLoadingDiagram]);

  React.useEffect(() => {
    if (currentFeatureID.id && currentFeatureID.type === "route_node") {
      console.log(
        `diagram sees currentFeatureID changed to ${currentFeatureID.id}`
      );

      setPointOfInterestID(currentFeatureID.id);
    }
  }, [currentFeatureID, setPointOfInterestID]);

  React.useEffect(() => {
    setLoadingDiagram(!!loading);
  }, [loading, setLoadingDiagram]);

  React.useEffect(() => {
    if (active && data && data.diagramService) {
      setFeatureData(data);
    } else {
      setFeatureData({});
    }
  }, [data, active, setFeatureData]);

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
      {error && (
        <Alert bsStyle="warning">
          <span>
            <b> Error - </b>
            {error.graphQLErrors.map(({ message }, i) => (
              <span key={i}>{message}</span>
            ))}
          </span>
        </Alert>
      )}
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
