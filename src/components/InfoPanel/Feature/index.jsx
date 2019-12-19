import React from "react";
import Card from "../../Card/Card.jsx";
import { Col, Nav, NavItem, Tab, Row } from "react-bootstrap";
import cardHeader from "./cardHeader";
import ConduitsTab from "./ConduitsTab/index";
import ClosuresTab from "./ClosuresTab/index";
// import EquipmentTab from "./EquipmentTab";
// import CircuitsTab from "./CircuitsTab";
import CurrentFeatureContext from "hooks/CurrentFeatureContext";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import { useTranslation } from "react-i18next";

const FeatureInfoPanel = () => {
  const { t } = useTranslation();
  const {
    currentFeature,
    currentFeatureError,
    currentFeatureLoading
  } = React.useContext(CurrentFeatureContext);
  const feature = currentFeature.routeNode || currentFeature.routeSegment;
  const isRouteNode = !!currentFeature.routeNode

  const header = cardHeader(
    feature,
    currentFeatureError,
    currentFeatureLoading
  );
  const [activeKey, setActiveKey] = React.useState("closure");

  React.useLayoutEffect(() => {
    new PerfectScrollbar("#scroll-container", {
      minScrollbarLength: 20
    });
  }, [currentFeature]);

  const handleSelect = selectedKey => {
    setActiveKey(selectedKey);
  };

  React.useEffect(() => {
    
  })

  const defaultActiveKey = () => {
    return isRouteNode ? "closure" : "conduits"
  };

  return (
    <Card
      title={header.title}
      category={header.category}
      ctFullWidth
      content={
        <Tab.Container
          id="itemInfo"
          defaultActiveKey={defaultActiveKey()}
          onSelect={handleSelect}
        >
          <Row className="clearfix">
            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavItem eventKey="conduits">{t("general.conduits")}</NavItem>

                {isRouteNode && (
                  <NavItem eventKey="closure">{t("general.closure")}</NavItem>
                )}
                {/* 
                <NavItem eventKey="equipment">{t("general.equipment")}</NavItem>

                <NavItem eventKey="circuits">{t("general.circuits")}</NavItem> */}
              </Nav>
            </Col>

            <Col sm={12}>
              <Tab.Content
                animation
                id="scroll-container"
                style={{ position: "relative" }}
              >
                <ConduitsTab eventKey="conduits" />

                <ClosuresTab
                  active={activeKey === "closure"}
                  eventKey="closure"
                />

                {/* <EquipmentTab currentFeature={feature} eventKey="equipment" />

                <CircuitsTab currentFeature={feature} eventKey="circuits" /> */}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      }
    />
  );
};

export default FeatureInfoPanel;
