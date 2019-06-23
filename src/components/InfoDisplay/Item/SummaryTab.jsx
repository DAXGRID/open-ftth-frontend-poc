import React from "react";
import { Tab } from "react-bootstrap";

const SummaryTab = ({ currentFeature, eventKey }) => {
  return (
    <Tab.Pane eventKey={eventKey}>
      <strong>Summary</strong>
    </Tab.Pane>
  );
}

export default SummaryTab;
