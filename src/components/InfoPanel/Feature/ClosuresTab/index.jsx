import React from "react";
import { Tab } from "react-bootstrap";
import useClosure from "hooks/useNodeWithClosure";
import ClosureDiagram from "components/Diagrams/ClosureDiagram";

const ClosuresTab = ({ currentFeatureID, active, eventKey }) => {
  const featureID = active ? currentFeatureID : null;
  const { data, error, loading } = useClosure(featureID);
  let features = [];

  if (error) {
    console.error("Error Loading Item: ");
    console.error(error);
  }

  if (data && data.diagramService) {
    features = data.diagramService.buildRouteNodeDiagram.diagramObjects
  }

  return (
    <Tab.Pane eventKey={eventKey}>
      {loading && <p>Loading...</p>}
      {!loading && data && (
        <>
          <div style={{height: "50vh"}}>
            <ClosureDiagram features={features} />
          </div>
        </>

      )}

    </Tab.Pane>
  );
};

export default ClosuresTab;
