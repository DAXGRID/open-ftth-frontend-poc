import MapboxDraw from "@mapbox/mapbox-gl-draw";
import SnapPointMode from "./SnapPointMode";
import SnapLineMode from "./SnapLineMode";
import drawStyles from "./drawStyles";

const newDraw = permissions => {
  // SnapLineMode.permissions = SnapPointMode.permissions = permissions;
  const defaultControls = {
    point: true,
    line_string: true,
    combine_features: true,
    uncombine_features: true,
    trash: true
  };
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

const setupDraw = map => {
  const draw = newDraw();
  map.addControl(draw);

  map.on("draw.modechange", () => {
    const currentMode = draw.getMode();

    if (currentMode === "draw_point") draw.changeMode("snap_point");
    if (currentMode === "draw_line_string") draw.changeMode("snap_line");
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

export default setupDraw;
