import CommonSelectors from '@mapbox/mapbox-gl-draw/src/lib/common_selectors'

/**
* Returns existing point feature under a click event if there are any,
* using same logic as SimpleSelect

* @param e
* @returns GeoJSONFeature
*/
export const getPointFromEvent = (e) => {
  if (CommonSelectors.isFeature(e) && e.featureTarget.geometry.type === "Point") {
    return e.featureTarget
  }
}

/**
* Returns existing point features from coordinates if there are any

* @param {map}
* @param coords
* @returns [GeoJSONFeature]
*/
export const getPointsFromCoords = (map, coords) => {
  const layers = ['gl-draw-point-point-stroke-inactive.cold']
  return getFeaturesFromCoords(map, coords, layers)
}

/**
* Returns existing line features from coordinates if there are any

* @param {map}
* @param coords
* @returns [GeoJSONFeature]
*/
export const getLinesFromCoords = (map, coords) => {
  const layers = ['gl-draw-line-inactive.cold']
  return getFeaturesFromCoords(map, coords, layers)
}

/**
* Returns existing features from coordinates if there are any

* @param {map}
* @param coords
* @param [layers]
* @returns [GeoJSONFeature]
*/
export const getFeaturesFromCoords = (map, coords, layers) => {
  if (map == null) return
  const xypoint = map.project(coords)
  const existing = map.queryRenderedFeatures(xypoint, {layers: layers})

  if (existing.length > 0) return existing
}
