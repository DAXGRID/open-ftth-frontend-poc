import React from 'react'
import { connect } from 'react-redux'
import { createFeatures, updateFeatures, deleteFeatures } from '../../../redux/actions'
import { editableFeature } from '../../../lib/draw/permissions'
import EditableMapboxDisplay from '../EditableMapboxDisplay'
import { useStateValue } from '../../../hooks/state.jsx'

const container = 'mapbox-map'

var MapDisplay = (props) => {
  const [{ currentFeature }, dispatch] = useStateValue();
  const editableFeatures = props.features.filter((feature) => {
    editableFeature(feature, props.currentUser.permissions)
  })

  return (
    <div style={{width: '100%', height: '100%'}}>
                currentFeature
                {currentFeature}
      <EditableMapboxDisplay
        viewport={props.viewport}
        editableFeatures={editableFeatures}
        uneditableFeatures={props.uneditableFeatures}
        permissions={props.currentUser.permissions}
        currentFeature={currentFeature}
        createFeatures={props.createFeatures}
        updateFeatures={props.updateFeatures}
        deleteFeatures={props.deleteFeatures}
        container={container}/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.users[state.currentUserID],
    features: state.features,
    viewport: {
      latitude: "55.746384700121446",
      longitude: "9.6377473217318386",
      zoom: 15,
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

MapDisplay = connect(mapStateToProps, mapDispatchToProps)(MapDisplay)

export default MapDisplay
