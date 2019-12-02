import React from "react";
import { Tab } from "react-bootstrap";
import ClosureDiagram from "components/Diagrams/ClosureDiagram";
import { ClickProvider } from "hooks/ClickContext";
import { DiagramProvider } from "hooks/DiagramContext";

const ClosuresTab = ({ currentFeature, active, eventKey }) => {
  return (
    <Tab.Pane eventKey={eventKey}>
      <div style={{ height: "80vh" }}>
        <ClickProvider>
          <DiagramProvider>
            <ClosureDiagram currentFeature={currentFeature} active={active} />
          </DiagramProvider>
        </ClickProvider>
      </div>
    </Tab.Pane>
  );
};

export default ClosuresTab;
