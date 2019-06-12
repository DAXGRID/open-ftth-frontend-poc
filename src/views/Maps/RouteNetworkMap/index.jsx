import React from 'react'
import { Col } from 'react-bootstrap'
import MediaQuery from 'react-responsive'
import MapDisplay from './MapDisplay'
import InfoDisplay from './InfoDisplay'

const RouteNetworkMap = (props) => {
  return (
    <>
      <MediaQuery minWidth={1224}>
        <Col lg={8} md={12} style={{height: '80vh'}}>
          <MapDisplay uneditableFeatures={props.uneditableFeatures}/>
        </Col>
      </MediaQuery>
      <MediaQuery maxWidth={1224}>
        <Col lg={8} md={12} style={{height: '50vh'}}>
          <MapDisplay uneditableFeatures={props.uneditableFeatures}/>
        </Col>
      </MediaQuery>

      <Col lg={4} md={12} className="pt-3">
        <InfoDisplay />
      </Col>
    </>
  )
}

export default RouteNetworkMap
