import mapboxgl from "mapbox-gl";
import CommonSelectors from "@mapbox/mapbox-gl-draw/src/lib/common_selectors";
import _ from "lodash";

/**
* Returns existing point feature under a click event if there are any,
* using same logic as SimpleSelect

* @param e
* @returns GeoJSONFeature
*/
export const getPointFromEvent = e => {
  if (
    CommonSelectors.isFeature(e) &&
    e.featureTarget.geometry.type === "Point"
  ) {
    return e.featureTarget;
  }
};

/**
* Returns existing point features from coordinates if there are any

* @param {map}
* @param coords
* @returns [GeoJSONFeature]
*/
export const getPointsFromCoords = ({ map, coords, layers = [] }) => {
  if (!layers.length) layers = ["gl-draw-point-point-stroke-inactive.cold"];
  return getFeaturesFromCoords({ map, coords, layers });
};

/**
* Returns existing line features from coordinates if there are any

* @param {map}
* @param coords
* @returns [GeoJSONFeature]
*/
export const getLinesFromCoords = ({ map, coords, layers = [] }) => {
  if (!layers.length) layers = ["gl-draw-line-inactive.cold"];
  return getFeaturesFromCoords({ map, coords, layers });
};

/**
* Returns existing features from coordinates if there are any

* @param {map}
* @param coords
* @param [layers]
* @returns [GeoJSONFeature]
*/
export const getFeaturesFromCoords = ({ map, coords, layers = [] }) => {
  if (map == null) return;
  const xypoint = map.project(coords);
  const existing = map.queryRenderedFeatures(xypoint, { layers: layers });

  if (existing.length > 0) return existing;
};

export const getFeaturesFromEvent = (map, e, layers, boxsize = 2) => {
  var features = [];
  const bboxSize = boxsize;
  const mapLayer = map.getLayer(layers[0]);
  if (typeof mapLayer !== "undefined") {
    features = map.queryRenderedFeatures(bbox(e, bboxSize), { layers });
  }
  return features;
};

export const getFeatureFromEvent = (map, e, layers) => {
  return getFeaturesFromEvent(map, e, layers)[0];
};

const bbox = (e, bboxSize) => {
  return [
    [e.point.x - bboxSize, e.point.y - bboxSize],
    [e.point.x + bboxSize, e.point.y + bboxSize]
  ];
};

export const fitBounds = (map, features, padding = 50) => {
  let coordinates = features.map(feature => {
    if(feature._geometry) return feature._geometry.coordinates;
    if(feature.geometry) return feature.geometry.coordinates;
  });

  coordinates = _.flatten(coordinates)

  const bounds = coordinates.reduce(function(bounds, coord) {
    return bounds.extend(coord);
  }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

  map.fitBounds(bounds, {
    padding: padding
  });
};
