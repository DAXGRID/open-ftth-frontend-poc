import React, { Component } from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import SnapPointMode from '../../lib/SnapPointMode'
import SnapLineMode from '../../lib/SnapLineMode'
import { drawStyles } from '../../lib/snapUtils'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

class Map extends Component {
  componentDidMount() {
    const { longitude, latitude, zoom, styleID } = this.props.viewport
    const mapConfig = {
      container: this.props.container,
      style: `mapbox://styles/${ styleID }`,
      center: [longitude, latitude],
      zoom,
    }
    mapboxgl.accessToken = process.env.REACT_APP_MapboxAccessToken

    const map = new mapboxgl.Map(mapConfig)
    const draw = new MapboxDraw({
      styles: drawStyles,
      userProperties: true,
      displayControlsDefault: false,
      controls: { point: true, line_string: true, combine_features: true, uncombine_features: true, trash: true },
      modes: {
        ...MapboxDraw.modes,
        snap_point: SnapPointMode,
        snap_line: SnapLineMode,
      }
    })
    map.addControl(draw)
    map.addControl(this.props.reduxControl)

    const features = this.props.features
    map.on('load', () => {
      if(features && features.length > 0) {
        features.map(( feature, i ) =>
          draw.add(feature)
        )
      }
    })

    map.on('draw.modechange', (e) => {
      // user check here - 
      if (draw.getMode() === 'draw_point') draw.changeMode('snap_point')
      if (draw.getMode() === 'draw_line_string') draw.changeMode('snap_line')
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
  features: PropTypes.array,
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
