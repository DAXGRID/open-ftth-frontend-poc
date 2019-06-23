import React from "react";
import { Tab } from "react-bootstrap";

const SummaryTab = ({ currentFeature, setCurrentFeature, eventKey }) => {
  return (
    <Tab.Pane eventKey={eventKey}>
      <strong>Summary</strong>

    </Tab.Pane>
  );
}

export default SummaryTab;
