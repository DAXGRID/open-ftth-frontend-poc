import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import ExampleDiagram from "components/Diagrams/ExampleDiagram.jsx";
import ClosureDiagram from "components/Diagrams/ClosureDiagram.jsx";

const Diagrams = () => {
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
                  <div className="content" style={{height: "55vh"}}>
                    <ExampleDiagram />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="header">
                    <h4 className="title">Closure</h4>
                  </div>
                  <div className="content" style={{height: "55vh"}}>
                    {/* <ClosureDiagram /> */}
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
