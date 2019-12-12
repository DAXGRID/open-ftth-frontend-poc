import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import DiagramFeatures from "./DiagramFeatures";
import DiagramContext from "hooks/DiagramContext";

const MapboxDiagram = ({ config }) => {
  const [map, setMap] = React.useState();
  const { diagramFeatures } = React.useContext(DiagramContext);

  const shouldDrawFeatures = React.useCallback(() => {
    return (map && map.loaded() && diagramFeatures.length)
  }, [map, diagramFeatures])

  // Setup Map
  React.useLayoutEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MapboxAccessToken;
    if (map) return;
    setMap(new mapboxgl.Map(config));
  }, [config, map]);

  React.useEffect(() => {
    if (!map) return;
    map.scrollZoom.disable();

    const nav = new mapboxgl.NavigationControl({
      showCompass: false,
      showZoom: true
    });

    map.addControl(nav, "top-left");
  }, [map]);


  return (
    <div style={{ width: "100%", height: "40vw" }}>
      <div
        id={config.container}
        style={{ width: "100%", height: "100%" }}
      ></div>
      {shouldDrawFeatures && (<DiagramFeatures map={map} diagramFeatures={diagramFeatures} />)}
    </div>
  );
};

export default MapboxDiagram;
