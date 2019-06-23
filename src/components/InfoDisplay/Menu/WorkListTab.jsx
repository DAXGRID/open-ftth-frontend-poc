import React from "react";
import { Tab } from "react-bootstrap";

const WorkListTab = ({ currentFeature, setCurrentFeature, eventKey }) => {
  return (
    <Tab.Pane eventKey={eventKey}>
      <strong>WorkListTab</strong>
    </Tab.Pane>
  );
}

export default WorkListTab;
