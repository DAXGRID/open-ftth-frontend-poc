import MapboxDraw from '@mapbox/mapbox-gl-draw'
import SnapPointMode from './SnapPointMode'
import SnapLineMode from './SnapLineMode'
import drawStyles from './drawStyles'

export const newDraw = ({permissions}) => {
  SnapLineMode.permissions = SnapPointMode.permissions = permissions
  const defaultControls = {
    point: true,
    line_string: true,
    combine_features: true,
    uncombine_features: true,
    trash: true
  }
  const controls = (permissions.drawControls) ? permissions.drawControls : defaultControls

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
  })
}
