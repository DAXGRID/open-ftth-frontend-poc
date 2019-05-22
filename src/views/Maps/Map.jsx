import React, { Component } from 'react';
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import MapboxDraw from 'mapbox-gl-draw'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'mapbox-gl-draw/dist/mapbox-gl-draw.css'

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
      displayControlsDefault: false,
      controls: { point: true, line_string: true, combine_features: true, uncombine_features: true, trash: true }
    })
    map.addControl(draw)
    map.addControl(this.props.reduxControl)

    const features = this.props.features
    map.on('load', () => {
      features.map(( feature, i ) =>
        draw.add(feature)
      )
    })

    map.on('draw.create', (e) => {
      this.props.createFeatures(e.features)
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
  features: PropTypes.array.isRequired,
  createFeatures: PropTypes.func
}

Map.defaultProps = {
  createFeatures: () => {}
}

export default Map
