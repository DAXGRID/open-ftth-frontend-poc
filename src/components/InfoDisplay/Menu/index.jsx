import React from "react";
import Card from "../../Card/Card.jsx";
import { Col, Nav, NavItem, Tab, Row } from "react-bootstrap";
import SummaryTab from "./SummaryTab";
import WorkListTab from "./WorkListTab";

const MenuItem = ({ currentFeature, setCurrentFeature }) => {
  return (
    <Card
      title="Route Network Map"
      ctFullWidth
      content={
        <Tab.Container id="menuItem" defaultActiveKey="summary">
          <Row className="clearfix">
            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavItem eventKey="summary">Summary</NavItem>
                <NavItem eventKey="workList">Work List</NavItem>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation>
                <SummaryTab
                  currentFeature={currentFeature}
                  setCurrentFeature={setCurrentFeature}
                  eventKey="summary"
                />
                <WorkListTab
                  currentFeature={currentFeature}
                  setCurrentFeature={setCurrentFeature}
                  eventKey="workList"
                />
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      }
    />
  );
};

export default MenuItem;
