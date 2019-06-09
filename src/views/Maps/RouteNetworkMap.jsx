import React from 'react'
import { connect } from 'react-redux'
import { createFeatures, updateFeatures, deleteFeatures } from '../../redux/actions'
import { editableFeature } from '../../lib/users'
import * as MapboxGLRedux from '@mapbox/mapbox-gl-redux'
import Map from './Map'

const ReduxMapControl= MapboxGLRedux.ReduxMapControl
const container = 'mapbox-map'
const control = new ReduxMapControl(container)

var RouteNetworkMap = props => {
  const editableFeatures = props.features.filter((feature) => editableFeature(feature, props.currentUser))
  const uneditableFeatures = props.features.filter((feature) => !editableFeature(feature, props.currentUser))

  return (
    <>
      <Map
        viewport={props.viewport}
        editableFeatures={editableFeatures}
        uneditableFeatures={uneditableFeatures}
        createFeatures={props.createFeatures}
        updateFeatures={props.updateFeatures}
        deleteFeatures={props.deleteFeatures}
        reduxControl={control}
        container={container}/>
    </>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.users[state.currentUserID],
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
