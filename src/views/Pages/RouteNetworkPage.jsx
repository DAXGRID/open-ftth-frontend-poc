import React from "react";
import { Col } from "react-bootstrap";
import MediaQuery from "react-responsive";
import { FeatureProvider } from "hooks/FeatureContext.jsx";
import { CurrentFeatureProvider } from "hooks/CurrentFeatureContext.jsx";
import CurrentFeatureLoader from "hooks/CurrentFeatureLoader.jsx";
import MapboxDisplay from "components/Maps/MapboxDisplay";
import InfoPanel from "components/InfoPanel/FeatureContextSwitcher.jsx";

function RouteNetworkPage() {
  return (
    <FeatureProvider>
      <CurrentFeatureProvider>
        <CurrentFeatureLoader>
          <MediaQuery minWidth={1224}>
            <Col lg={8} md={12} style={{ height: "85vh" }}>
              <MapboxDisplay />
            </Col>
          </MediaQuery>
          <MediaQuery maxWidth={1224}>
            <Col lg={8} md={12} style={{ height: "50vh" }}>
              <MapboxDisplay />
            </Col>
          </MediaQuery>
        </CurrentFeatureLoader>
        <Col lg={4} md={12} className="pt-3">
          <InfoPanel />
        </Col>
      </CurrentFeatureProvider>
    </FeatureProvider>
  );
}

export default RouteNetworkPage;
