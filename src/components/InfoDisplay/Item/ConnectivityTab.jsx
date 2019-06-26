import React from "react";
import { Tab } from "react-bootstrap";

const ConnectivityTab = ({ currentFeature, eventKey }) => {
  
  return (
    <Tab.Pane eventKey={eventKey}>
      <strong>Connectivity</strong>

    </Tab.Pane>
  );
}

export default ConnectivityTab;
