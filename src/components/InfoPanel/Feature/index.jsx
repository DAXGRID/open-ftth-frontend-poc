import React, { useEffect } from "react";
import Card from "../../Card/Card.jsx";
import { Col, Nav, NavItem, Tab, Row } from "react-bootstrap";
import SummaryTab from "./SummaryTab";
import ConnectivityTab from "./ConnectivityTab";
import RouteNetworkTab from "./RouteNetworkTab";
import { useTranslation } from "react-i18next";

const FeatureInfoPanel = ({ currentFeature, setCurrentFeatureID }) => {
  const { t } = useTranslation();
  console.log('feature')
  console.log(currentFeature)

  const props = currentFeature.routeNode;
  var title = props.segmentKind ? props.segmentKind : props.nodeKind;
  title += ` ID: ${props.id}`;
  const category = props.nodeFunctionKind ? props.nodeFunctionKind : "";

  return (
    <Card
      title={title}
      category={category}
      ctFullWidth
      content={
        <Tab.Container id="itemInfo" defaultActiveKey="summary">
          <Row className="clearfix">
            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavItem eventKey="summary">{t('general.summary')}</NavItem>
                <NavItem eventKey="connectivity">{t('general.connectivity')}</NavItem>
                <NavItem eventKey="routeNetwork">{t('general.network')}</NavItem>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation>
                <SummaryTab
                  currentFeature={currentFeature}
                  eventKey="summary"
                />
                <ConnectivityTab
                  currentFeature={currentFeature}
                  eventKey="connectivity"
                />
                <RouteNetworkTab
                  currentFeature={currentFeature}
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
