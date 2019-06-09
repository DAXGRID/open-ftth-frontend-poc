// adapted from https://github.com/davidgilbertson/draw-geoson

/* eslint-disable no-param-reassign, react/no-this-in-sfc, func-names */
import Constants from '@mapbox/mapbox-gl-draw/src/constants'
import doubleClickZoom from '@mapbox/mapbox-gl-draw/src/lib/double_click_zoom'
import DrawPoint from '@mapbox/mapbox-gl-draw/src/modes/draw_point'
import { getPointFromEvent } from './getUtils.js'
import {
  findGuidesFromFeatures,
  getGuideFeature,
  IDS,
  GEOMETRY_TYPES,
  makeFeature,
  roundLngLatTo1Cm,
  shouldHideGuide,
  snapAndDrawGuides,
} from './snapUtils'

const SnapPointMode = {...DrawPoint}

let handleMoveEnd

SnapPointMode.onSetup = function({properties = {}}) {
  const point = this.newFeature(
    makeFeature({
      type: GEOMETRY_TYPES.POINT,
      properties,
    })
  )

  // not ideal, but we need to access draw for the getAll function
  const draw = this.map._controls.filter((control) => control.hasOwnProperty('getAll'))[0]
  const snapFeatures = [...this.map.queryRenderedFeatures(), ...draw.getAll().features]
  const verticalGuide = this.newFeature(getGuideFeature(IDS.VERTICAL_GUIDE))
  const horizontalGuide = this.newFeature(getGuideFeature(IDS.HORIZONTAL_GUIDE))

  this.addFeature(point)
  this.addFeature(verticalGuide)
  this.addFeature(horizontalGuide)
  this.clearSelectedFeatures()
  doubleClickZoom.disable(this)

  const state = {
    guides: findGuidesFromFeatures({
      map: this.map,
      draw,
      snapFeatures,
      currentFeature: point,
    }),
    horizontalGuide,
    map: this.map,
    draw: draw,
    point,
    snapPx: 10,
    verticalGuide,
  }

  handleMoveEnd = () => {
    // Update the guide locations after zoom, pan, rotate, or resize
    state.guides = findGuidesFromFeatures({map: this.map, currentFeature: point, draw: this.draw})
  }

  this.map.on('moveend', handleMoveEnd)

  return state
}

SnapPointMode.onTap = SnapPointMode.onClick = function(state, e) {
  // Don't allow overlying points
  const existingPoint = getPointFromEvent(e)

  if (existingPoint) {
    const existingPointID = existingPoint.properties.id
    console.warn('Attempted to create point on existing point, selected existing instead')
    this.changeMode(Constants.modes.SIMPLE_SELECT, { featureIds: [existingPointID] })
    return
  }

  DrawPoint.onClick.call(this, state, {
    lngLat: {
      lng: roundLngLatTo1Cm(state.snappedLng),
      lat: roundLngLatTo1Cm(state.snappedLat),
    },
  })
}

SnapPointMode.onMouseMove = function(state, e) {
  const {lng, lat} = snapAndDrawGuides(state, e)

  state.snappedLng = lng
  state.snappedLat = lat

  this.updateUIClasses({mouse: Constants.cursors.ADD})
}

// This is 'extending' DrawPoint.toDisplayFeatures
SnapPointMode.toDisplayFeatures = function(state, geojson, display) {
  if (shouldHideGuide(state, geojson)) return

  // This relies on the the state of SnapPointMode having a 'point' prop
  DrawPoint.toDisplayFeatures(state, geojson, display)
}

// This is 'extending' DrawPoint.onStop
SnapPointMode.onStop = function(state) {
  this.deleteFeature(IDS.VERTICAL_GUIDE, {silent: true})
  this.deleteFeature(IDS.HORIZONTAL_GUIDE, {silent: true})
  this.map.off('moveend', handleMoveEnd)

  // This relies on the the state of SnapPointMode having a 'point' prop
  DrawPoint.onStop.call(this, state)
}

export default SnapPointMode
