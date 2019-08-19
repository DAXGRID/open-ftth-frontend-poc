import React from "react";
import { Tab } from "react-bootstrap";
import useClosure from "hooks/useNodeWithClosure";
import ClosureDiagram from "components/Diagrams/ClosureDiagram.jsx";

// import { useTranslation } from "react-i18next";

const ClosuresTab = ({ currentFeatureID, active, eventKey }) => {
  const featureID = active ? currentFeatureID : null;
  const { data, error, loading } = useClosure(featureID);

  if (error) {
    console.log("Error Loading Item: ");
    console.log(error);
  }

  console.log('data')
  console.log(data);
  return (
    <Tab.Pane eventKey={eventKey}>
      {loading && <p>Loading...</p>}
      {!loading && data && <p>Closures</p>}
    </Tab.Pane>
  );
};

export default ClosuresTab;
