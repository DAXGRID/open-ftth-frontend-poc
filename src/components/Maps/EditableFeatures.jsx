import React from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import SnapPointMode from "lib/mapbox/draw/SnapPointMode";
import SnapLineMode from "lib/mapbox/draw/SnapLineMode";
import drawStyles from "lib/mapbox/draw/drawStyles";
import CurrentFeatureContext from "hooks/CurrentFeatureContext.jsx";

const EditableFeatures = ({ map, features }) => {
  const [draw, setDraw] = React.useState();
  const { setCurrentFeatureID } = React.useContext(CurrentFeatureContext);

  React.useEffect(() => {
    if (!map || !features) return;
    setDraw(setupDraw());
  }, [map, features]);

  React.useEffect(() => {
    if (!map || !draw || !features) return;

    features.segments && features.segments.map(feature => draw.add(feature));
    features.nodes && features.nodes.map(feature => draw.add(feature));
  }, [map, draw, features]);

  const setupDraw = () => {
    const draw = newDraw();
    map.addControl(draw);

    map.on("draw.modechange", () => {
      const currentMode = draw.getMode();

      if (currentMode === "draw_point") draw.changeMode("snap_point");
      if (currentMode === "draw_line_string") draw.changeMode("snap_line");
    });

    map.on("draw.selectionchange", e => {
      const feature = e.features[0];
      let featureID;
      let featureType;

      if (feature && feature.properties) {
        featureID = feature.properties.id;
        featureType = feature.properties.dataType;
      }

      setCurrentFeatureID({ id: featureID, type: featureType });
    });

    // map.on("draw.create", e => {
    //   props.createFeatures(e.features);
    // });

    // map.on("draw.update", e => {
    //   props.updateFeatures(e.features);
    // });

    // map.on("draw.delete", e => {
    //   props.deleteFeatures(e.features);
    // });
    return draw;
  };

  const newDraw = () => {
    // SnapLineMode.permissions = SnapPointMode.permissions = permissions;
    const defaultControls = {
      point: true,
      line_string: true,
      combine_features: true,
      uncombine_features: true,
      trash: true
    };
    let permissions;
    const controls =
      permissions && permissions.drawControls
        ? permissions.drawControls
        : defaultControls;

    return new MapboxDraw({
      styles: drawStyles,
      userProperties: true,
      displayControlsDefault: false,
      controls,
      modes: {
        ...MapboxDraw.modes,
        snap_point: SnapPointMode,
        snap_line: SnapLineMode
      }
    });
  };

  return <></>;
};
export default EditableFeatures;
