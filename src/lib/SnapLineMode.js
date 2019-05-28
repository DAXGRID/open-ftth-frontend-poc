// adapted from https://github.com/davidgilbertson/draw-geoson

/* eslint-disable no-param-reassign, react/no-this-in-sfc, func-names */
import Constants from '@mapbox/mapbox-gl-draw/src/constants'
import doubleClickZoom from '@mapbox/mapbox-gl-draw/src/lib/double_click_zoom'
import DrawLine from '@mapbox/mapbox-gl-draw/src/modes/draw_line_string'
import {
  addPointToGuides,
  findGuidesFromFeatures,
  getGuideFeature,
  IDS,
  GEOMETRY_TYPES,
  makeFeature,
  roundLngLatTo1Cm,
  shouldHideGuide,
  snapAndDrawGuides,
  createPoint,
} from './snapUtils'

const SnapLineMode = {...DrawLine}

let handleMoveEnd

SnapLineMode.onSetup = function({onAdd = () => {}, properties = {}}) {
  const line = this.newFeature(
    makeFeature({
      type: GEOMETRY_TYPES.LINE_STRING,
      properties,
    })
  )

  // not ideal, but we need to access draw for the getAll function
  const draw = this.map._controls.filter((control) => control.hasOwnProperty('getAll'))[0]
  const verticalGuide = this.newFeature(getGuideFeature(IDS.VERTICAL_GUIDE))
  const horizontalGuide = this.newFeature(getGuideFeature(IDS.HORIZONTAL_GUIDE))

  this.addFeature(line)
  this.addFeature(verticalGuide)
  this.addFeature(horizontalGuide)
  this.clearSelectedFeatures()
  doubleClickZoom.disable(this)

  const state = {
    currentVertexPosition: 0,
    direction: 'forward', // expected by DrawLineString
    guides: findGuidesFromFeatures({map: this.map, currentFeature: line, draw: draw}),
    horizontalGuide,
    line,
    map: this.map,
    draw: draw,
    onAdd,
    snapPx: 10,
    verticalGuide,
  }

  handleMoveEnd = () => {
    // Update the guide locations after zoom, pan, rotate, or resize
    state.guides = findGuidesFromFeatures({
      map: this.map,
      draw: this.draw,
      currentFeature: line,
    })
  }

  this.map.on('moveend', handleMoveEnd)

  return state
}

SnapLineMode.onClick = function(state) {
  // We save some processing by rounding on click, not mousemove
  const lng = roundLngLatTo1Cm(state.snappedLng)
  const lat = roundLngLatTo1Cm(state.snappedLat)

  // End the drawing if this click is on the previous position
  // Note: not bothering with 'direction'
  if (state.currentVertexPosition > 0) {
    const lastVertex = state.line.coordinates[state.currentVertexPosition - 1]

    if (lastVertex[0] === lng && lastVertex[1] === lat) {
      return this.changeMode(Constants.modes.SIMPLE_SELECT)
    }
  }

  const point = state.map.project({lng, lat})

  addPointToGuides(state.guides, point)

  state.line.updateCoordinate(state.currentVertexPosition, lng, lat)

  state.currentVertexPosition++

  state.line.updateCoordinate(state.currentVertexPosition, lng, lat)

  return null
}

SnapLineMode.onMouseMove = function(state, e) {
  const {lng, lat} = snapAndDrawGuides(state, e)

  state.line.updateCoordinate(state.currentVertexPosition, lng, lat)
  state.snappedLng = lng
  state.snappedLat = lat

  this.updateUIClasses({mouse: Constants.cursors.ADD})
}

// This is 'extending' DrawLine.toDisplayFeatures
SnapLineMode.toDisplayFeatures = function(state, geojson, display) {
  if (shouldHideGuide(state, geojson)) return

  // This relies on the the state of SnapLineMode being similar to DrawLine
  DrawLine.toDisplayFeatures(state, geojson, display)
}

// This is 'extending' DrawLine.onStop
SnapLineMode.onStop = function(state) {
  this.deleteFeature(IDS.VERTICAL_GUIDE, {silent: true})
  this.deleteFeature(IDS.HORIZONTAL_GUIDE, {silent: true})
  this.map.off('moveend', handleMoveEnd)

  // This relies on the the state of SnapLineMode being similar to DrawLine
  DrawLine.onStop.call(this, state)

  // Draw points on start and end coordinates
  // TODO if they don't exist yet
  const coords = state.line.toGeoJSON().geometry.coordinates
  const startPointCoords = coords[0]
  const endPointCoords = coords[coords.length - 1]

  const startPoint = this.newFeature({
    geometry: {
      type: 'Point',
      coordinates: startPointCoords,
    },
  })

  const endPoint = this.newFeature({
    geometry: {
      type: 'Point',
      coordinates: endPointCoords,
    },
  })

  this.addFeature(startPoint)
  this.addFeature(endPoint)

  if (startPoint.isValid()) {
    this.map.fire(Constants.events.CREATE, {
      features: [startPoint.toGeoJSON()]
    });
  }

  if (endPoint.isValid()) {
    this.map.fire(Constants.events.CREATE, {
      features: [endPoint.toGeoJSON()]
    });
  }

  state.onAdd(state.line)
  state.onAdd(startPoint)
  state.onAdd(endPoint)
}

export default SnapLineMode
