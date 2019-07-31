import React, { useContext } from "react";
import Card from "../../Card/Card.jsx";
import { Col, Nav, NavItem, Tab, Row } from "react-bootstrap";
import ConduitsTab from "./ConduitsTab";
import EquipmentTab from "./EquipmentTab";
import CircuitsTab from "./CircuitsTab";
import CurrentFeatureContext from "../../../hooks/CurrentFeatureContext";
import { useTranslation } from "react-i18next";

const FeatureInfoPanel = () => {
  const { t } = useTranslation();
  const {
    currentFeature,
    currentFeatureError,
    currentFeatureLoading
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
      title = feature.name ? feature.name : feature.id;

      const address = feature.locationInfo.accessAddress;
      category = (
        <dl>
          <dt>ID: </dt>
          <dd>{feature.id}</dd>

          <dt>Kind: </dt>
          {feature.nodeKind && <dd>{feature.nodeKind}</dd>}
          {feature.segmentKind && <dd>{feature.segmentKind}</dd>}

          <dt>Function: </dt>
          {feature.nodeFunctionKind && <dd>{feature.nodeFunctionKind}</dd>}
          {feature.segmentFunctionKind && (
            <dd>{feature.segmentFunctionKind}</dd>
          )}

          {address && (
            <>
              <dt>Address: </dt>
              <dd>
                {address.houseNumber} {address.streetName}
              </dd>
            </>
          )}
        </dl>
      );
    }

    return { title, category };
  };

  return (
    <Card
      title={cardHeader().title}
      category={cardHeader().category}
      ctFullWidth
      content={
        <Tab.Container id="itemInfo" defaultActiveKey="conduits">
          <Row className="clearfix">
            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavItem eventKey="conduits">{t("general.conduits")}</NavItem>
                <NavItem eventKey="equipment">{t("general.equipment")}</NavItem>
                <NavItem eventKey="circuits">{t("general.circuits")}</NavItem>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation>
                <ConduitsTab currentFeature={feature} eventKey="conduits" />
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
