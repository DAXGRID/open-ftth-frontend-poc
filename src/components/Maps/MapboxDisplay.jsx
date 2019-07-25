import React, { useContext, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import * as MapboxGLRedux from "@mapbox/mapbox-gl-redux";
import configureDraw from "../../lib/draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { getFeaturesFromEvent } from "../../lib/draw/getUtils";
import { nodesLayer } from "../../lib/mapbox/layers/nodes";
import { segmentsLayer } from "../../lib/mapbox/layers/segments";
import FeatureContext from "hooks/FeatureContext.jsx";
import CurrentFeatureContext from "hooks/CurrentFeatureContext.jsx";

const MapboxDisplay = props => {
  const container = "mapbox-map";
  const viewport = {
    latitude: "55.746384700121446",
    longitude: "9.6377473217318386",
    zoom: 15,
    styleID: "tamimitchell/cjx2ss4or057d1cnqj9j62jwl"
  };
  
  const { features } = useContext(FeatureContext);
  const { currentFeature, setCurrentFeatureID } = useContext(
    CurrentFeatureContext
  );

  // Can't use hooks inside this effect without redrawing map
  React.useLayoutEffect(() => {
    const MapboxReduxControl = new MapboxGLRedux.ReduxMapControl(container);
    const uneditableFeatures = features;
    const editableFeatureTypes = null; // props.permissions.editableFeatureTypes;

    const { longitude, latitude, zoom, styleID } = viewport;
    const mapConfig = {
      container: container,
      style: `mapbox://styles/${styleID}`,
      center: [longitude, latitude],
      zoom
    };
    mapboxgl.accessToken = process.env.REACT_APP_MapboxAccessToken;
    const map = new mapboxgl.Map(mapConfig);
    map.addControl(MapboxReduxControl);

    map.on("load", () => {
      if (uneditableFeatures) {
        if (uneditableFeatures.segments)
          map.addLayer(segmentsLayer(uneditableFeatures.segments));
        if (uneditableFeatures.nodes)
          map.addLayer(nodesLayer(uneditableFeatures.nodes));
      }

      if (editableFeatureTypes) configureDraw(map, props);
    });

    map.on("click", e => {
      const features = getFeaturesFromEvent({ map, e });
      if (features.length > 0) {
        const feature = features[0];
        setCurrentFeatureID(feature.properties.id);
      } else {
        setCurrentFeatureID(null);        
      }
    });

    map.on("mousemove", e => {
      const features = getFeaturesFromEvent({ map, e });
      if (features.length > 0) {
        map.getCanvas().style.cursor = "pointer";
      } else {
        map.getCanvas().style.cursor = "";
      }
    });
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id={container} style={{ width: "100%", height: "100%" }} />;
    </div>
  );
};

export default MapboxDisplay;
