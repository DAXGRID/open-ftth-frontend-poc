import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Diagram from "components/Diagrams/Diagram.jsx";

const Diagrams = () => {
  const ports = [
    {
      name: "Innerduct_1_Red",
      color: "red"
    },
    {
      name: "Innerduct_2_Yellow",
      color: "yellow"
    },
    {
      name: "Innerduct_3_Green",
      color: "green"
    }
  ];
  
  const data = {
    nodes: [
      {
        name: "Point A",
        color: "rgb(0,192,255)",
        out: ports,
        in: []
      },
      {
        name: "Point B",
        color: "rgb(0,192,255)",
        out: [],
        in: ports
      }
    ]
  };

  return (
    <div className="main-content buttons-with-margin">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <div className="card">
              <Row>
                <Col md={6}>
                  <div className="header">
                    <h4 className="title">Standard</h4>
                  </div>
                  <div className="content">
                    <Diagram data={data} />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Diagrams;
