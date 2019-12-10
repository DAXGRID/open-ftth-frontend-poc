import React from "react";
import { Tab } from "react-bootstrap";
import ClosureDiagram from "components/Diagrams/ClosureDiagram";
import { ClickProvider } from "hooks/ClickContext";
import { DiagramProvider } from "hooks/DiagramContext";
import CurrentFeatureContext from "hooks/CurrentFeatureContext";

const ClosuresTab = ({ active, eventKey }) => {
  const {
    currentFeatureID,
  } = React.useContext(CurrentFeatureContext);

  return (
    <Tab.Pane eventKey={eventKey}>
      <div style={{ height: "50vh" }}>
        <ClickProvider>
          <DiagramProvider>
            { currentFeatureID && (
            <ClosureDiagram currentFeatureID={currentFeatureID} active={active} /> )}
          </DiagramProvider>
        </ClickProvider>
      </div>
    </Tab.Pane>
  );
};

export default ClosuresTab;
