import React from 'react'
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { connect } from 'react-redux'
import { createFeatures, updateFeatures, deleteFeatures } from '../../../redux/actions'
import { editableFeature } from '../../../lib/draw/permissions'
import { filterFeatureData } from '../../../lib/mapbox/filterData'

import * as MapboxGLRedux from '@mapbox/mapbox-gl-redux'
import Map from './Map'

const ReduxMapControl= MapboxGLRedux.ReduxMapControl
const container = 'mapbox-map'
const control = new ReduxMapControl(container)

const FEATURES = gql`
  {
    routeNodes {
      id
      name
      nodeKind
      nodeFunctionKind
      geometry {
        type
        coordinates
      }
    }

    routeSegments {
      id
      segmentKind
      geometry {
        type
        coordinates
      }
    }
  }
`;

var RouteNetworkMap = props => {
  const editableFeatures = props.features.filter((feature) => editableFeature(feature, props.currentUser.permissions))
  const uneditableFeatures = props.features.filter((feature) => !editableFeature(feature, props.currentUser.permissions))

  return (
    <div style={{width: '100%', height: '100%'}}>
      <Query query={FEATURES}>
        {({ loading, error, data }) => {
          if (error) return (<p>{error.message}{console.log(error)}</p> )
          if (loading || !data) return <p>Fetching</p>

          if (data) {
            const features = filterFeatureData(data)

            return (
              <Map
                viewport={props.viewport}
                editableFeatures={editableFeatures}
                uneditableFeatures={features}
                permissions={props.currentUser.permissions}
                createFeatures={props.createFeatures}
                updateFeatures={props.updateFeatures}
                deleteFeatures={props.deleteFeatures}
                reduxControl={control}
                container={container}/>
            )
          }
        }}
      </Query>
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

RouteNetworkMap = connect(mapStateToProps, mapDispatchToProps)(RouteNetworkMap)

export default RouteNetworkMap
