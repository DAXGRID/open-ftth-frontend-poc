import CommonSelectors from '@mapbox/mapbox-gl-draw/src/lib/common_selectors'

// adapted from https://github.com/davidgilbertson/draw-geoson

/* eslint-disable no-param-reassign */
import uuid from 'uuid/v4'
import * as turf from '@turf/turf'
import defaultTheme from '@mapbox/mapbox-gl-draw/src/lib/theme.js'

export const IDS = {
  VERTICAL_GUIDE: 'VERTICAL_GUIDE',
  HORIZONTAL_GUIDE: 'HORIZONTAL_GUIDE',
}

export const GEOMETRY_TYPES = {
  POLYGON: 'Polygon',
  LINE_STRING: 'LineString',
  POINT: 'Point',
}

// Note: this lng/lat rounding doesn't have anything to do with snapping,
// but can reduce output file size quite a lot
// There's not much point in 13 decimal places of lng/lat.

// Number of decimal places in lat/lng values
// One day could be configurable
export const ACCURACY = {
  '1 m': 5,
  '10 cm': 6,
  '1 cm': 7,
  '1 mm': 8,
}

export const round = (num, decimals) => Math.round(num * 10 ** decimals) / 10 ** decimals

export const roundLngLatTo1Cm = num => round(num, ACCURACY['1 cm'])

/**
* Creates a GeoJSON feature to pass to mapbox-gl-draw
*
* @param {string} type
* @param properties
* @returns GeoJSONFeature
*/
export const makeFeature = ({type, properties = {}}) => ({
  id: uuid(),
  type: 'Feature',
  properties: {
      ...properties,
      pam: 'true',
  },
  geometry: {
      type,
      coordinates: [[]],
  },
})

/**
* Takes a  and maybe adds it to the list of guides.
*
* Mutates guides.
*
* @param {object} guides
* @param {Array<number>} guides.vertical
* @param {Array<number>} guides.horizontal
* @param {object} point
* @param {number} point.x
* @param {number} point.y
* @param {boolean} [forceInclusion]
*/
export const addPointToGuides = (guides, point, forceInclusion) => {
  const {x, y} = point

  // Don't add points not visible on the page (it's annoying)
  const pointIsOnTheScreen = x > 0 && x < window.innerWidth && y > 0 && y < window.innerHeight

  // But do add off-screen points if forced (e.g. for the current feature)
  // So features will always snap to their own points
  if (pointIsOnTheScreen || forceInclusion) {
      // Don't add duplicates
      if (!guides.vertical.includes(x)) {
          guides.vertical.push(x)
      }
      if (!guides.horizontal.includes(y)) guides.horizontal.push(y)
  }
}

/**
* Loops over all features to get vertical and horizontal guides to snap to
*
* @param {object} props
* @param props.map
* @param props.currentFeature
* @returns {{vertical: Array, horizontal: Array}}
*/
export const findGuidesFromFeatures = ({map, currentFeature, draw}) => {
  const guides = {
      vertical: [],
      horizontal: [],
  }

  if (!draw) {
    console.error('No draw object passed to findGuidesFromFeatures')
    return
  }

  draw.getAll().features.forEach(feature => {
    // Only snap to PAM features
    if (feature.properties.pam !== 'true') return

    // If this is re-running because a user is moving the map, the features might include
    // guides
    if (feature.id === IDS.HORIZONTAL_GUIDE || feature.id === IDS.VERTICAL_GUIDE) return

    const isTheCurrentFeature = currentFeature && (feature.id === currentFeature.id)

    let coordinates

    if (isTheCurrentFeature) {
      // For the current polygon, the last two points are the mouse position and back home
      // so we chop those off (else we get guides showing where the user clicked, even
      // if they were just panning the map)
      if (currentFeature.type === GEOMETRY_TYPES.POLYGON) {
        coordinates = feature.geometry.coordinates[0].slice(0, -2)
      } else if (currentFeature.type === GEOMETRY_TYPES.LINE_STRING) {
        // Similar for lines, chop off the last point
        coordinates = feature.geometry.coordinates.slice(0, -1)
      } else {
        // if the currentFeature is a Point, don't do anything with it
        return
      }
    } else {
      // If this isn't the current feature, use all the points within it
      coordinates = turf.coordAll(feature)
    }

    coordinates.forEach(coordinate => {
      if(coordinate.length > 1) {
        addPointToGuides(guides, map.project(coordinate), isTheCurrentFeature)
      }
    })
  })

  return guides
}

/**
* For a given point, this returns any vertical and/or horizontal guides within snapping distance
*
* @param guides
* @param point
* @param snapPx
* @returns {{vertical: number | undefined, horizontal: number | undefined}}
*/
const getNearbyGuides = (guides, point, snapPx) => {
  const nearbyVerticalGuide = guides.vertical.find(guide => Math.abs(guide - point.x) < snapPx)

  const nearbyHorizontalGuide = guides.horizontal.find(
    guide => Math.abs(guide - point.y) < snapPx
  )

  return {
    verticalPx: nearbyVerticalGuide,
    horizontalPx: nearbyHorizontalGuide,
  }
}

/**
* Returns snap points if there are any, otherwise the original lng/lat of the event
* Also, defines if guides should show on the state object
*
* Mutates the state object
*
* @param state
* @param e
* @returns {{lng: number, lat: number}}
*/
export const snapAndDrawGuides = (state, e) => {
  let lng = e.lngLat.lng
  let lat = e.lngLat.lat

  // Holding alt bypasses all snapping
  if (e.originalEvent.altKey) {
    state.showVerticalSnapLine = false
    state.showHorizontalSnapLine = false

    return {lng, lat}
  }

  const {verticalPx, horizontalPx} = getNearbyGuides(state.guides, e.point, state.snapPx)

  if (verticalPx) {
      // Draw a line from top to bottom
    const lngLatTop = state.map.unproject({x: verticalPx, y: 0})
    const lngLatBottom = state.map.unproject({x: verticalPx, y: window.innerHeight})
    const lngLatPoint = state.map.unproject({x: verticalPx, y: e.point.y})

    state.verticalGuide.updateCoordinate(0, lngLatTop.lng, lngLatTop.lat)
    state.verticalGuide.updateCoordinate(1, lngLatBottom.lng, lngLatBottom.lat)

    lng = lngLatPoint.lng
    lat = lngLatPoint.lat
  }

  if (horizontalPx) {
    // Draw a line from left to right
    const lngLatLeft = state.map.unproject({x: 0, y: horizontalPx})
    const lngLatRight = state.map.unproject({x: window.innerWidth, y: horizontalPx})
    const lngLatPoint = state.map.unproject({x: e.point.x, y: horizontalPx})

    state.horizontalGuide.updateCoordinate(0, lngLatLeft.lng, lngLatLeft.lat)
    state.horizontalGuide.updateCoordinate(1, lngLatRight.lng, lngLatRight.lat)

    lng = lngLatPoint.lng
    lat = lngLatPoint.lat
  }

  if (verticalPx && horizontalPx) {
    // For rather complicated reasons, we need to explicitly set both so it behaves on a rotated map
    const lngLatPoint = state.map.unproject({x: verticalPx, y: horizontalPx})

    lng = lngLatPoint.lng
    lat = lngLatPoint.lat
  }

  state.showVerticalSnapLine = !!verticalPx
  state.showHorizontalSnapLine = !!horizontalPx

  return {lng, lat}
}

/**
* Returns a guide GeoJSON feature to pass to mapbox-gl-draw
* @param id
* @returns GeoJSONFeature
*/
export const getGuideFeature = id => ({
  id,
  type: 'Feature',
  properties: {
    isSnapGuide: 'true', // for styling
  },
  geometry: {
    type: GEOMETRY_TYPES.LINE_STRING,
    coordinates: [],
  },
})

export const shouldHideGuide = (state, geojson) => {
  if (geojson.properties.id === IDS.VERTICAL_GUIDE && !state.showVerticalSnapLine) {
    return true
  }

  if (geojson.properties.id === IDS.HORIZONTAL_GUIDE && !state.showHorizontalSnapLine) {
    return true
  }

  return false
}


/**
* Returns existing point feature if there are any, using same logic as SimpleSelect

* @param e
* @returns GeoJSONFeature
*/
export const getPointFeature = (e) => {
  if (CommonSelectors.isFeature(e) && e.featureTarget.geometry.type === "Point") {
    return e.featureTarget
  }
}

export const drawStyles = [
  {
    // redo inactive line without styling snap guide to avoid layered line styles
    'id': 'gl-draw-line-inactive',
    'type': 'line',
    'filter': ['all',
      ['==', 'active', 'false'],
      ['==', '$type', 'LineString'],
      ['!=', 'mode', 'static'],
      ['!=', 'user_isSnapGuide', 'true']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#3bb2d0',
      'line-width': 2
    }
  },
  {
    id: 'pam-snap-guide',
    type: 'line',
    filter: ['all', ['==', '$type', 'LineString'], ['==', 'user_isSnapGuide', 'true']],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#404040',
      'line-width': 2,
      'line-opacity': 0.25
    },
  },
  ...defaultTheme.filter((style) => style.id !== 'gl-draw-line-inactive')
]
