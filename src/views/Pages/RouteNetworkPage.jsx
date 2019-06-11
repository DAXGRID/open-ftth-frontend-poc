import React from 'react'
import MediaQuery from 'react-responsive'
import {
  Grid,
  Row,
  Col,
} from "react-bootstrap"
import Card from "components/Card/Card.jsx";
import RouteNetworkMap from "../Components/Maps/RouteNetworkMap.jsx"


const RouteNetworkPage = (props) => {
  var mapheight

  return (
    <Grid fluid>
      <Row>
        <MediaQuery minWidth={1224}>
          <Col lg={8} md={12} style={{height: '80vh'}}>
            <RouteNetworkMap />
          </Col>
        </MediaQuery>
        <MediaQuery maxWidth={1224}>
          <Col lg={8} md={12} style={{height: '50vh'}}>
            <RouteNetworkMap />
          </Col>
        </MediaQuery>

        <Col lg={4} md={12} className="pt-3">
          <Card
            title="Light Bootstrap Table Heading"
            category="Created using Roboto Font Family"
            content={
              <div>
                <p className="category">Header 1</p>Light Bootstrap
                Table Heading{" "}
              </div>
            }
          />

        </Col>
      </Row>
    </Grid>
  )
}

export default RouteNetworkPage
