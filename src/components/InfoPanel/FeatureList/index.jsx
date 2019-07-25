import React, { useContext } from "react";
import Card from "../../Card/Card.jsx";
import { Col, Nav, NavItem, Tab, Row } from "react-bootstrap";
import SummaryTab from "./SummaryTab";
import WorkListTab from "./WorkListTab";
import CurrentFeatureContext from "../../../hooks/CurrentFeatureContext";
import { useTranslation } from "react-i18next";

const FeatureListInfoPanel = () => {
  const { t } = useTranslation();
  const { setCurrentFeatureID } = useContext(CurrentFeatureContext);
  return (
    <Card
      title={t("general.route_network_map")}
      ctFullWidth
      content={
        <Tab.Container id="menuItem" defaultActiveKey="summary">
          <Row className="clearfix">
            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavItem eventKey="summary">{t("general.summary")}</NavItem>
                <NavItem eventKey="workList">{t("general.work_list")}</NavItem>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation>
                <SummaryTab
                  setCurrentFeature={setCurrentFeatureID}
                  eventKey="summary"
                />
                <WorkListTab
                  setCurrentFeature={setCurrentFeatureID}
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

export default FeatureListInfoPanel;
