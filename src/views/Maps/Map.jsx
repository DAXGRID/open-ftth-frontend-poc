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
    const draw = new MapboxDraw()
    map.addControl(draw)
    map.addControl(this.props.reduxControl)

    const routeSegments = this.props.routeSegments
    map.on('load', () => {
      console.log('load routeSegments')
      console.log(routeSegments)
      routeSegments.map(( routeSegment, i ) =>
        draw.add(routeSegment)
        // map.addLayer({
        //   id: `routeSegments_${i}`,
        //   type: 'line',
        //   source: {
        //     type: 'geojson',
        //     data: {
        //       type: 'Feature',
        //       ...routeSegment
        //     }
        //   }
        // })
      )
    })

    map.on('draw.create', (e) => {
      this.props.createFeatures(e.features[0])
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
  routeSegments: PropTypes.array,
  nodes: PropTypes.array,
  createFeatures: PropTypes.func
}

Map.defaultProps = {
  createFeatures: () => {}
}

export default Map
