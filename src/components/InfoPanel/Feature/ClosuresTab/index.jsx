import React from "react";
import { Tab } from "react-bootstrap";
import useDiagramService from "hooks/useDiagramService";
import ClosureDiagram from "components/Diagrams/ClosureDiagram";

const ClosuresTab = ({ currentFeatureID, active, eventKey }) => {
  const { data, error, loading } = useDiagramService(currentFeatureID, loading);
  const [features, setFeatures] = React.useState();

  React.useEffect(() => {
    if (error) {
      console.error("Error Loading Item: ");
      console.error(error);
    }
  }, [error]);

  React.useEffect(() => {
    if (active && data && data.diagramService && !features) {
      setFeatures(data.diagramService.buildRouteNodeDiagram.diagramObjects);
    }
  }, [data]);

  return (
    <Tab.Pane eventKey={eventKey}>
      {loading && <p>Loading...</p>}
      {!loading && data && (
        <>
          <div style={{ height: "70vh" }}>
            {features && <ClosureDiagram features={features} />}
          </div>
        </>
      )}
    </Tab.Pane>
  );
};

export default ClosuresTab;
