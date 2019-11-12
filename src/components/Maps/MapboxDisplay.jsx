import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import EditableFeatures from "./EditableFeatures";
import UneditableFeatures from "./UneditableFeatures";
import _ from "lodash";

const MapboxDisplay = ({ config, uneditableFeatures, editableFeatures }) => {
  const [map, setMap] = React.useState();

  React.useLayoutEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MapboxAccessToken;
    setMap(new mapboxgl.Map(config));
  }, [config]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id={config.container} style={{ width: "100%", height: "100%" }} />
      {uneditableFeatures && _.size(uneditableFeatures) > 0 && (
        <UneditableFeatures map={map} features={uneditableFeatures} />
      )}

      {editableFeatures && _.size(editableFeatures) > 0 && (
        <EditableFeatures map={map} features={editableFeatures} />
      )}
    </div>
  );
};

export default MapboxDisplay;
