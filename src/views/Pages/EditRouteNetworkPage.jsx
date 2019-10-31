import React from "react";
import { Col } from "react-bootstrap";
import MediaQuery from "react-responsive";
import { FeatureProvider } from "hooks/FeatureContext.jsx";
import { CurrentFeatureProvider } from "hooks/CurrentFeatureContext.jsx";
import CurrentFeatureLoader from "hooks/CurrentFeatureLoader.jsx";
import RouteNetworkMap from "components/Maps/RouteNetworkMap";
import InfoPanel from "components/InfoPanel/FeatureContextSwitcher.jsx";

function RouteNetworkPage(props) {
  const projectID = 1;

  return (
    <FeatureProvider>
      <CurrentFeatureProvider>
        <CurrentFeatureLoader>
          <MediaQuery minWidth={1224}>
            <Col lg={7} md={12} style={{ height: "85vh" }}>
              <RouteNetworkMap projectID={projectID}/>
            </Col>
          </MediaQuery>
          <MediaQuery maxWidth={1224}>
            <Col lg={7} md={12} style={{ height: "50vh" }}>
              <RouteNetworkMap projectID={projectID}/>
            </Col>
          </MediaQuery>
        </CurrentFeatureLoader>
        <Col lg={5} md={12} className="pt-3">
          <InfoPanel />
        </Col>
      </CurrentFeatureProvider>
    </FeatureProvider>
  );
}

export default RouteNetworkPage;
