import React from "react";
import { Tab } from "react-bootstrap";

const RouteNetworkTab = ({ currentFeature, eventKey }) => {
  return (
    <Tab.Pane eventKey={eventKey}>
      <strong>RouteNetworkTab</strong>
    </Tab.Pane>
  );
}

export default RouteNetworkTab;
