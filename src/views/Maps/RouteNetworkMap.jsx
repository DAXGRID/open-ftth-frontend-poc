import React from "react";
import mapboxgl from 'mapbox-gl'
import MapboxDraw from 'mapbox-gl-draw';

import 'mapbox-gl/dist/mapbox-gl.css'
import 'mapbox-gl-draw/dist/mapbox-gl-draw.css'

class RouteNetworkMap extends React.Component {
  state = {
    viewport: {
      latitude: "37.9135",
      longitude: "-122.2914",
      zoom: 16,
      styleID: "mapbox/light-v10"
    }
  }

  componentDidMount(){
    const { longitude, latitude, zoom, styleID } = this.state.viewport;
    const mapConfig = {
      container: this.mapContainer,
      style: `mapbox://styles/${ styleID }`,
      center: [longitude, latitude],
      zoom: zoom,
    };
    mapboxgl.accessToken = process.env.REACT_APP_MapboxAccessToken;

    this.map = new mapboxgl.Map(mapConfig);

    const draw = new MapboxDraw();
    this.map.addControl(draw);


    this.map.on('load', () => {
      // const style = this.map.getStyle();
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} style={{width: '100%', height: '100%'}}>
      </div>
    )
  }
}

export default RouteNetworkMap;
