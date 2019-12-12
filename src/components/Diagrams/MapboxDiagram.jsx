import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import DiagramFeatures from "./DiagramFeatures";
import DiagramContext from "hooks/DiagramContext";

const MapboxDiagram = ({ config }) => {
  const sourceID = "diagramFeatures";
  const [map, setMap] = React.useState();
  const [mapLoaded, setMapLoaded] = React.useState(false);
  const { diagramFeatures } = React.useContext(DiagramContext);

  const shouldDrawFeatures = React.useCallback(() => {
    return map && mapLoaded && diagramFeatures && diagramFeatures.length;
  }, [map, mapLoaded, diagramFeatures]);

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

    map.on("load", () => {
      map.addSource(sourceID, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });

      setMapLoaded(true);
    });
  }, [map]);

  return (
    <div style={{ width: "100%", height: "40vw" }}>
      <div
        id={config.container}
        style={{ width: "100%", height: "100%" }}
      ></div>
      {shouldDrawFeatures() && (
        <DiagramFeatures map={mapLoaded ? map : null} sourceID={sourceID} diagramFeatures={diagramFeatures} />
      )}
    </div>
  );
};

export default MapboxDiagram;
