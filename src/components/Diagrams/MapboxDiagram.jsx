import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import DiagramFeatures from "./DiagramFeatures";

const MapboxDiagram = ({ config, features }) => {
  const [map, setMap] = React.useState();

  React.useLayoutEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MapboxAccessToken;
    if (map) return;
    setMap(new mapboxgl.Map(config));
  }, []);


  React.useEffect(() => {
    console.log("map resize")
    if (map) map.resize();
  });

  React.useEffect(() => {
    if (!map) return;
    map.scrollZoom.disable();
  }, [map]);


  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id={config.container} style={{ width: "100%", height: "100%" }}></div>
      {features && <DiagramFeatures map={map} features={features} />}
    </div>
  );
};

export default MapboxDiagram;
