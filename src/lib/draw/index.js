import MapboxDraw from '@mapbox/mapbox-gl-draw'
import SnapPointMode from './SnapPointMode'
import SnapLineMode from './SnapLineMode'
import drawStyles from './drawStyles'

SnapPointMode.foo = "bar"
console.log('SnapPointMode')
console.log(SnapPointMode)

export const draw = new MapboxDraw({
  styles: drawStyles,
  userProperties: true,
  displayControlsDefault: false,
  controls: { point: true, line_string: true, combine_features: true, uncombine_features: true, trash: true },
  modes: {
    ...MapboxDraw.modes,
    snap_point: SnapPointMode,
    snap_line: SnapLineMode
  }
})
