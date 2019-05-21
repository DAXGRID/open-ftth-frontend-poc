import React from 'react'
import { connect } from 'react-redux'
import { addRouteSegment } from '../../redux/actions'
import * as MapboxGLRedux from '@mapbox/mapbox-gl-redux'
import Map from './Map'

const ReduxMapControl= MapboxGLRedux.ReduxMapControl
const container = 'mapbox-map'
const control = new ReduxMapControl(container)

var RouteNetworkMap = props => (
  <>
    <Map
      viewport={props.viewport}
      routeSegments={props.routeSegments}
      nodes={props.nodes}
      createFeatures={props.createFeatures}
      reduxControl={control}
      container={container}/>
  </>
)

const mapStateToProps = state => {
  return {
    routeSegments: state.routeSegments,
    nodes: state.nodes,
    viewport: {
      latitude: "37.9135",
      longitude: "-122.2914",
      zoom: 16,
      styleID: "mapbox/streets-v9"
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createFeatures: feature => {
      dispatch(addRouteSegment(feature))
    }
  }
}

RouteNetworkMap = connect(mapStateToProps, mapDispatchToProps)(RouteNetworkMap)

export default RouteNetworkMap
