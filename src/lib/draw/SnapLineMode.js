// adapted from https://github.com/davidgilbertson/draw-geoson

/* eslint-disable no-param-reassign, react/no-this-in-sfc, func-names */
import Constants from "@mapbox/mapbox-gl-draw/src/constants";
import doubleClickZoom from "@mapbox/mapbox-gl-draw/src/lib/double_click_zoom";
import DrawLine from "@mapbox/mapbox-gl-draw/src/modes/draw_line_string";
import { getPointsFromCoords } from "./getUtils.js";
import { userAllowedToAddFeatureHere } from "./permissions";
import {
  addPointToGuides,
  findGuidesFromFeatures,
  getGuideFeature,
  IDS,
  GEOMETRY_TYPES,
  makeFeature,
  roundLngLatTo1Cm,
  shouldHideGuide,
  snapAndDrawGuides
} from "./snapUtils";

const SnapLineMode = { ...DrawLine };

let handleMoveEnd;

SnapLineMode.onSetup = function({ onAdd = () => {}, properties = {} }) {
  const line = this.newFeature(
    makeFeature({
      type: GEOMETRY_TYPES.LINE_STRING,
      properties
    })
  );

  // not ideal, but we need to access draw for the getAll function
  const draw = this.map._controls.filter(control =>
    control.hasOwnProperty("getAll")
  )[0];
  const snapFeatures = [
    ...this.map.queryRenderedFeatures(),
    ...draw.getAll().features
  ];
  const verticalGuide = this.newFeature(getGuideFeature(IDS.VERTICAL_GUIDE));
  const horizontalGuide = this.newFeature(
    getGuideFeature(IDS.HORIZONTAL_GUIDE)
  );

  this.addFeature(line);
  this.addFeature(verticalGuide);
  this.addFeature(horizontalGuide);
  this.clearSelectedFeatures();
  doubleClickZoom.disable(this);

  const state = {
    currentVertexPosition: 0,
    direction: "forward", // expected by DrawLineString
    guides: findGuidesFromFeatures({
      map: this.map,
      draw,
      snapFeatures,
      currentFeature: line
    }),
    horizontalGuide,
    line,
    map: this.map,
    draw: draw,
    onAdd,
    snapPx: 10,
    verticalGuide,
    permissions: SnapLineMode.permissions
  };

  handleMoveEnd = () => {
    // Update the guide locations after zoom, pan, rotate, or resize
    state.guides = findGuidesFromFeatures({
      map: this.map,
      draw: this.draw,
      currentFeature: line
    });
  };

  this.map.on("moveend", handleMoveEnd);

  return state;
};

SnapLineMode.onClick = function(state) {
  // We save some processing by rounding on click, not mousemove
  const lng = roundLngLatTo1Cm(state.snappedLng);
  const lat = roundLngLatTo1Cm(state.snappedLat);

  // End the drawing if this click is on the previous position
  // Note: not bothering with 'direction'
  if (state.currentVertexPosition > 0) {
    const lastVertex = state.line.coordinates[state.currentVertexPosition - 1];

    if (lastVertex[0] === lng && lastVertex[1] === lat) {
      return this.changeMode(Constants.modes.SIMPLE_SELECT);
    }
  }

  if (
    state.permissions.canOnlyAddToExistingFeatureLayers &&
    state.permissions.canOnlyAddToExistingFeatureLayers.lines
  ) {
    const lineAddPermissions =
      state.permissions.canOnlyAddToExistingFeatureLayers.lines;
    const coords = state.line.coordinates[0];

    if (!userAllowedToAddFeatureHere(state, lineAddPermissions, coords)) {
      return this.changeMode(Constants.modes.SIMPLE_SELECT);
    }
  }

  const point = state.map.project({ lng, lat });
  addPointToGuides(state.guides, point);
  state.line.updateCoordinate(state.currentVertexPosition, lng, lat);
  state.currentVertexPosition++;
  state.line.updateCoordinate(state.currentVertexPosition, lng, lat);
  return null;
};

SnapLineMode.onMouseMove = function(state, e) {
  const { lng, lat } = snapAndDrawGuides(state, e);

  state.line.updateCoordinate(state.currentVertexPosition, lng, lat);
  state.snappedLng = lng;
  state.snappedLat = lat;

  this.updateUIClasses({ mouse: Constants.cursors.ADD });
};

// This is 'extending' DrawLine.toDisplayFeatures
SnapLineMode.toDisplayFeatures = function(state, geojson, display) {
  if (shouldHideGuide(state, geojson)) return;

  // This relies on the the state of SnapLineMode being similar to DrawLine
  DrawLine.toDisplayFeatures(state, geojson, display);
};

// This is 'extending' DrawLine.onStop
SnapLineMode.onStop = function(state) {
  this.deleteFeature(IDS.VERTICAL_GUIDE, { silent: true });
  this.deleteFeature(IDS.HORIZONTAL_GUIDE, { silent: true });

  // check to see if we've deleted this feature or ending on first point
  if (
    state.line.coordinates.length <= 1 ||
    this.getFeature(state.line.id) === undefined
  )
    return;

  this.map.off("moveend", handleMoveEnd);

  // This relies on the the state of SnapLineMode being similar to DrawLine
  DrawLine.onStop.call(this, state);
  state.onAdd(state.line);

  // Draw points on start and end coordinates if they don't exist yet
  this.createEndPoints(state);
};

SnapLineMode.createEndPoints = function(state) {
  const coords = state.line.coordinates;

  const startPointCoords = coords[0];
  if (!getPointsFromCoords({ map: state.map, coords: startPointCoords })) {
    const startPoint = this.createPointFromCoords(startPointCoords);
    state.onAdd(startPoint);
  } else {
    console.warn("Attempted to generate endpoint on existing point, skipped");
  }

  const endPointCoords = coords[coords.length - 1];
  if (!getPointsFromCoords({ map: state.map, coords: endPointCoords })) {
    const endPoint = this.createPointFromCoords(endPointCoords);
    state.onAdd(endPoint);
  } else {
    console.warn("Attempted to generate endpoint on existing point, skipped");
  }
};

SnapLineMode.createPointFromCoords = function(coords) {
  const point = this.newFeature({
    geometry: {
      type: "Point",
      coordinates: coords
    }
  });
  this.addFeature(point);

  if (point.isValid()) {
    this.map.fire(Constants.events.CREATE, {
      features: [point.toGeoJSON()]
    });
  }

  return point;
};

export default SnapLineMode;
