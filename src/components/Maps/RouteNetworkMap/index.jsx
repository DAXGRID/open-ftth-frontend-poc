import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import MediaQuery from "react-responsive";
import MapDisplay from "./MapDisplay";
import InfoDisplay from "../../InfoDisplay";
import CurrentFeatureContext from "../../../contexts/CurrentFeatureContext";

function RouteNetworkMap({ features }) {
  const [currentFeature, setCurrentFeature] = React.useState();
  return (
    <>
      <CurrentFeatureContext.Provider
        value={{
          currentFeature: currentFeature,
          setCurrentFeature: setCurrentFeature
        }}
      >
        <MediaQuery minWidth={1224}>
          <Col lg={8} md={12} style={{ height: "80vh" }}>
            <MapDisplay uneditableFeatures={features} />
          </Col>
        </MediaQuery>
        <MediaQuery maxWidth={1224}>
          <Col lg={8} md={12} style={{ height: "50vh" }}>
            <MapDisplay uneditableFeatures={features} />
          </Col>
        </MediaQuery>

        <Col lg={4} md={12} className="pt-3">
          <InfoDisplay />
        </Col>
      </CurrentFeatureContext.Provider>
    </>
  );
}

RouteNetworkMap.propTypes = {
  features: PropTypes.object
};

export default RouteNetworkMap;
