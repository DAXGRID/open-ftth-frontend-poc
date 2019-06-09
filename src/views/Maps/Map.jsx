import React, { Component } from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import { draw } from '../../lib/draw'
import addUneditableFeatureLayers from '../../lib/mapbox/layers'

import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

class Map extends Component {
  componentDidMount() {
    const editableFeatures = this.props.editableFeatures
    const uneditableFeatures = this.props.uneditableFeatures

    const { longitude, latitude, zoom, styleID } = this.props.viewport
    const mapConfig = {
      container: this.props.container,
      style: `mapbox://styles/${ styleID }`,
      center: [longitude, latitude],
      zoom,
    }
    mapboxgl.accessToken = process.env.REACT_APP_MapboxAccessToken

    const map = new mapboxgl.Map(mapConfig)

    map.addControl(this.props.reduxControl)
    map.addControl(draw)

    map.on('load', () => {
      if(uneditableFeatures && uneditableFeatures.length > 0) {
        map.addSource('features', {
          type: 'geojson',
          data : {
            type: 'FeatureCollection',
            features: uneditableFeatures
          }
        })
        addUneditableFeatureLayers(map)
      }

      if(editableFeatures && editableFeatures.length > 0) {
        editableFeatures.map(( feature, i ) => draw.add(feature))
      }
    })

    map.on('draw.modechange', (e) => {
      const currentMode = draw.getMode()

      if (currentMode === 'draw_point') draw.changeMode('snap_point')
      if (currentMode === 'draw_line_string') draw.changeMode('snap_line')
    })

    map.on('draw.create', (e) => {
      this.props.createFeatures(e.features)
    })

    map.on('draw.update', (e) => {
      this.props.updateFeatures(e.features)
    })

    map.on('draw.delete', (e) => {
      this.props.deleteFeatures(e.features)
    })
  }

  render() {
    return (
      <div id={this.props.container} style={{width: '100%', height: '100%'}}>
      </div>
    )
  }
}

Map.propTypes = {
  viewport: PropTypes.shape({
    longitude: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    zoom: PropTypes.number.isRequired,
    styleID: PropTypes.string.isRequired,
  }),
  reduxControl: PropTypes.object.isRequired,
  container: PropTypes.string.isRequired,
  editableFeatures: PropTypes.array,
  uneditableFeatures: PropTypes.array,
  createFeatures: PropTypes.func,
  updateFeatures: PropTypes.func,
  deleteFeatures: PropTypes.func
}

Map.defaultProps = {
  createFeatures: () => {},
  updateFeatures: () => {},
  deleteFeatures: () => {}
}

export default Map
