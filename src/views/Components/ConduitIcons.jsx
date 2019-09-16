import React, { Component } from "react";
import { Grid, Col, Row } from "react-bootstrap";
import Card from "components/Card/Card.jsx";

import ConduitIcon from "components/ConduitIcon";

const ConduitIcons = () => {
  const colorOptions = [
    "Aqua",
    "Brown",
    "Red",
    "Yellow",
    "Blue",
    "Orange",
    "Green",
    "Pink",
    "Black",
    "Grey",
    "Violet"
  ];
  return (
    <div className="main-content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Conduit Icons"
              content={
                <div>
                  <Row>
                    {colorOptions.map(color => (
                      <Col md={1}>
                        <p>{color}</p>
                        <ConduitIcon color={color} />
                      </Col>
                    ))}
                  </Row>
                  <br/>
                  <hr/>

                  <Row>
                    <Col md={3}>
                      <p>Blue with 144 cable</p>
                      <ConduitIcon color="blue" cableSize="144" />
                    </Col>

                    <Col md={3}>
                      <p>Clear with orange color color marking</p>
                      <ConduitIcon color="clear" colorMarking="orange" />
                    </Col>

                    <Col md={3}>
                      <p>Clear with blue color marking and 72 cable</p>
                      <ConduitIcon
                        color="clear"
                        colorMarking="blue"
                        cableSize="72"
                      />
                    </Col>
                  </Row>
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default ConduitIcons;
