import MapboxDraw from '@mapbox/mapbox-gl-draw'
import SnapPointMode from './SnapPointMode'
import SnapLineMode from './SnapLineMode'
import drawStyles from './drawStyles'

export const newDraw = ({permissions}) => {
  SnapLineMode.permissions = SnapPointMode.permissions = permissions

  return new MapboxDraw({
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
}
