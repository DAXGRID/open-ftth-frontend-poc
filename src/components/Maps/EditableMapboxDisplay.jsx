import React from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import * as MapboxGLRedux from "@mapbox/mapbox-gl-redux";
import { newDraw } from "../../lib/draw";
import addUneditableFeatureLayers from "../../lib/mapbox/layers";
import { getFeaturesFromEvent } from "../../lib/draw/getUtils";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import CurrentFeatureContext from "../../contexts/CurrentFeatureContext";

function configureDraw(map, props) {
  const editableFeatures = props.editableFeatures;
  const draw = newDraw({ permissions: props.permissions });
  map.addControl(draw);
  editableFeatures.map(feature => draw.add(feature));

  map.on("draw.modechange", () => {
    const currentMode = draw.getMode();

    if (currentMode === "draw_point") draw.changeMode("snap_point");
    if (currentMode === "draw_line_string") draw.changeMode("snap_line");
  });

  map.on("draw.create", e => {
    props.createFeatures(e.features);
  });

  map.on("draw.update", e => {
    props.updateFeatures(e.features);
  });

  map.on("draw.delete", e => {
    props.deleteFeatures(e.features);
  });
}

const EditableMapboxDisplay = props => {
  const { currentFeature, setCurrentFeature } = React.useContext(
    CurrentFeatureContext
  );
  // Can't use hooks inside this effect without redrawing map
  var hoveredFeatureID;
  var selectedFeatureID;

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
      if (uneditableFeatures && uneditableFeatures.length > 0) {
        map.addSource("features", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: uneditableFeatures
          }
        });
        addUneditableFeatureLayers(map);
      }
      if (editableFeatureTypes) configureDraw(map, props);
    });

    map.on("click", e => {
      const features = getFeaturesFromEvent({ map, e });
      if (features.length > 0) {
        const feature = features[0];

        console.log(feature);
        setCurrentFeature(feature);
        if (features.length > 0) {
          if (selectedFeatureID) {
            map.setFeatureState(
              { source: "features", id: selectedFeatureID },
              { selected: false }
            );
          }
          selectedFeatureID = feature.id;

          map.setFeatureState(
            { source: "features", id: selectedFeatureID },
            { selected: true }
          );
        }
      }
    });

    map.on("mousemove", e => {
      const features = getFeaturesFromEvent({ map, e });
      if (features.length > 0) {
        const feature = features[0];
        if (hoveredFeatureID) {
          map.setFeatureState(
            { source: "features", id: hoveredFeatureID },
            { hover: false }
          );
        }
        hoveredFeatureID = feature.id;

        map.setFeatureState(
          { source: "features", id: hoveredFeatureID },
          { hover: true }
        );
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
  uneditableFeatures: PropTypes.array,
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
