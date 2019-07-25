import React, { useContext } from "react";
import Card from "../../Card/Card.jsx";
import { Col, Nav, NavItem, Tab, Row } from "react-bootstrap";
import SummaryTab from "./SummaryTab";
import ConnectivityTab from "./ConnectivityTab";
import RouteNetworkTab from "./RouteNetworkTab";
import CurrentFeatureContext from "../../../hooks/CurrentFeatureContext";
import { useTranslation } from "react-i18next";

const FeatureInfoPanel = () => {
  const { t } = useTranslation();
  const {
    currentFeature,
    currentFeatureError,
    currentFeatureLoading,
  } = useContext(CurrentFeatureContext);
  const feature = currentFeature.routeNode || currentFeature.routeSegment;

  console.log("feature");
  console.log(feature);

  const cardHeader = () => {
    let title, category;

    if (currentFeatureError) {
      title = "Error Loading Item: ";
      category = currentFeatureError;
    }

    if (currentFeatureLoading) {
      title = "";
      category = "Loading...";
    }

    if (feature) {
      title = feature.segmentKind ? feature.segmentKind : feature.nodeKind;
      title += ` ID: ${feature.id}`;
      category = feature.nodeFunctionKind ? feature.nodeFunctionKind : "";
    }

    return { title, category };
  };

  return (
    <Card
      title={cardHeader().title}
      category={cardHeader().category}
      ctFullWidth
      content={
        <Tab.Container id="itemInfo" defaultActiveKey="summary">
          <Row className="clearfix">
            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavItem eventKey="summary">{t("general.summary")}</NavItem>
                <NavItem eventKey="connectivity">
                  {t("general.connectivity")}
                </NavItem>
                <NavItem eventKey="routeNetwork">
                  {t("general.network")}
                </NavItem>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation>
                <SummaryTab
                  currentFeature={feature}
                  eventKey="summary"
                />
                <ConnectivityTab
                  currentFeature={feature}
                  eventKey="connectivity"
                />
                <RouteNetworkTab
                  currentFeature={feature}
                  eventKey="routeNetwork"
                />
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      }
    />
  );
};

export default FeatureInfoPanel;
