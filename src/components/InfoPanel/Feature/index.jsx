import React, { useContext } from "react";
import Card from "../../Card/Card.jsx";
import { Col, Nav, NavItem, Tab, Row } from "react-bootstrap";
import cardHeader from "./cardHeader";
import ConduitsTab from "./ConduitsTab/index";
import ClosuresTab from "./ClosuresTab/index";
import EquipmentTab from "./EquipmentTab";
import CircuitsTab from "./CircuitsTab";
import CurrentFeatureContext from "../../../hooks/CurrentFeatureContext";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import { useTranslation } from "react-i18next";

const FeatureInfoPanel = () => {
  const { t } = useTranslation();
  const {
    currentFeature,
    currentFeatureError,
    currentFeatureLoading
  } = useContext(CurrentFeatureContext);
  const feature = currentFeature.routeNode || currentFeature.routeSegment;
  const header = cardHeader(
    feature,
    currentFeatureError,
    currentFeatureLoading
  );
  const [activeKey, setActiveKey] = React.useState();

  React.useLayoutEffect(() => {
    new PerfectScrollbar("#scroll-container", {
      minScrollbarLength: 20
    });
  }, [currentFeature]);

  const handleSelect = selectedKey => {
    setActiveKey(selectedKey);
  };

  return (
    <Card
      title={header.title}
      category={header.category}
      ctFullWidth
      content={
        <Tab.Container
          id="itemInfo"
          defaultActiveKey="conduits"
          onSelect={handleSelect}
        >
          <Row className="clearfix">
            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavItem eventKey="conduits">{t("general.conduits")}</NavItem>

                {feature.conduitClosure && (
                  <NavItem eventKey="closure">{t("general.closure")}</NavItem>
                )}

                <NavItem eventKey="equipment">{t("general.equipment")}</NavItem>

                <NavItem eventKey="circuits">{t("general.circuits")}</NavItem>
              </Nav>
            </Col>

            <Col sm={12}>
              <Tab.Content
                animation
                id="scroll-container"
                style={{ height: "47vh", position: "relative" }}
              >
                <ConduitsTab currentFeature={feature} eventKey="conduits" />

                <ClosuresTab
                  currentFeatureID={feature.id}
                  active={activeKey === "closure"}
                  eventKey="closure"
                />

                <EquipmentTab currentFeature={feature} eventKey="equipment" />

                <CircuitsTab currentFeature={feature} eventKey="circuits" />
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      }
    />
  );
};

export default FeatureInfoPanel;
