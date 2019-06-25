import React from "react";
import Card from "../../Card/Card.jsx";
import { Col, Nav, NavItem, Tab, Row } from "react-bootstrap";
import SummaryTab from "./SummaryTab";
import ConnectivityTab from "./ConnectivityTab";
import RouteNetworkTab from "./RouteNetworkTab";

const ItemInfo = ({ currentFeature }) => {
  const props = currentFeature.properties;
  var title = props.segmentKind ? props.segmentKind : props.nodeKind;
  title += ` ID: ${currentFeature.id}`;
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
                <NavItem eventKey="summary">Summary</NavItem>
                <NavItem eventKey="connectivity">Connectivity</NavItem>
                <NavItem eventKey="routeNetwork">Network</NavItem>
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

export default ItemInfo;
