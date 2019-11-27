import React from "react";
import { Tab } from "react-bootstrap";
import useDiagramService from "hooks/useDiagramService";

import ClosureDiagram from "components/Diagrams/ClosureDiagram";

const ClosuresTab = ({ currentFeature, active, eventKey }) => {
  const [currentFeatureID, setCurrentFeatureID] = React.useState();
  const [features, setFeatures] = React.useState();
  const { data, error, loading } = useDiagramService(currentFeatureID, loading);

  React.useEffect(() => {
    if (error) {
      console.error("Error Loading Item: ");
      console.error(error);
    }
  }, [error]);

  React.useEffect(() => {
    if (currentFeature) {
      setCurrentFeatureID(currentFeature.id);
    }
  }, [currentFeature]);
  
  React.useEffect(() => {
    console.log("data changed");
    console.log(data);

    if (active && data && data.diagramService) {
      setFeatures(data.diagramService.buildRouteNodeDiagram.diagramObjects);
    } else {
      setFeatures([]);
    }
  }, [data]);

  return (
    <Tab.Pane eventKey={eventKey}>
      {loading && <p>Loading...</p>}
      {!loading && data && (
        <>
          <div style={{ height: "80vh" }}>
            <ClosureDiagram
              currentFeature={currentFeature}
              features={features}
            />
          </div>
        </>
      )}
    </Tab.Pane>
  );
};

export default ClosuresTab;
