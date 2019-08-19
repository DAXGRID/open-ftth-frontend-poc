import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import ConnectionDiagram from "components/Diagrams/ConnectionDiagram";

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
  
  const standardData = {
    nodes: [
      {
        name: "Point A",
        color: "rgb(0,192,255)",
        positionX: "5%",
        positionY: "10%",
        out: ports,
        in: []
      },
      {
        name: "Point B",
        color: "rgb(172, 223, 135)",
        positionX: "62%",
        positionY: "10%",
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
                  <ConnectionDiagram
                      width="100%"
                      height="400px"
                      containerID="connection-diagram"
                      data={standardData}
                      styleClass="diagram-widget-taller"
                      columns="2"
                    />
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
