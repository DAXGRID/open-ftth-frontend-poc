import React from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import * as MapboxGLRedux from "@mapbox/mapbox-gl-redux";
import configureDraw from "../../lib/draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import CurrentFeatureContext from "../../contexts/CurrentFeatureContext";
import { getFeaturesFromEvent } from "../../lib/draw/getUtils";
import { nodesLayer } from "../../lib/mapbox/layers/nodes";
import { segmentsLayer } from "../../lib/mapbox/layers/segments";

const EditableMapboxDisplay = props => {
  const { currentFeature, setCurrentFeature } = React.useContext(
    CurrentFeatureContext
  );

  // Can't use hooks inside this effect without redrawing map
  React.useLayoutEffect(() => {
    const MapboxReduxControl = new MapboxGLRedux.ReduxMapControl(
      props.container
    );
    const uneditableFeatures = props.uneditableFeatures;
    const editableFeatureTypes = props.permissions.editableFeatureTypes;

    const { longitude, latitude, zoom, styleID } = props.viewport;
    const mapConfig = {
      container: props.container,
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
      if (features) {
        const feature = features[0];
        setCurrentFeature(feature);
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

  return <div id={props.container} style={{ width: "100%", height: "100%" }} />;
};

EditableMapboxDisplay.propTypes = {
  viewport: PropTypes.shape({
    longitude: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    zoom: PropTypes.number.isRequired,
    styleID: PropTypes.string.isRequired
  }),
  container: PropTypes.string.isRequired,
  editableFeatures: PropTypes.array,
  uneditableFeatures: PropTypes.object,
  permissions: PropTypes.object,
  createFeatures: PropTypes.func,
  updateFeatures: PropTypes.func,
  deleteFeatures: PropTypes.func
};

EditableMapboxDisplay.defaultProps = {
  createFeatures: () => {},
  updateFeatures: () => {},
  deleteFeatures: () => {}
};

export default EditableMapboxDisplay;
