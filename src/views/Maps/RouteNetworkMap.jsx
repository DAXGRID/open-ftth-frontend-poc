import React from 'react'
import { connect } from 'react-redux'
import { createFeatures, updateFeatures, deleteFeatures } from '../../redux/actions'
import * as MapboxGLRedux from '@mapbox/mapbox-gl-redux'
import Map from './Map'

const ReduxMapControl= MapboxGLRedux.ReduxMapControl
const container = 'mapbox-map'
const control = new ReduxMapControl(container)

var RouteNetworkMap = props => (
  <>
    <Map
      viewport={props.viewport}
      features={props.features}
      createFeatures={props.createFeatures}
      updateFeatures={props.updateFeatures}
      deleteFeatures={props.deleteFeatures}
      reduxControl={control}
      container={container}/>
  </>
)

const mapStateToProps = state => {
  return {
    features: state.features,
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
    createFeatures: features => dispatch(createFeatures(features)),
    updateFeatures: features => dispatch(updateFeatures(features)),
    deleteFeatures: features => dispatch(deleteFeatures(features))
  }
}

RouteNetworkMap = connect(mapStateToProps, mapDispatchToProps)(RouteNetworkMap)

export default RouteNetworkMap
