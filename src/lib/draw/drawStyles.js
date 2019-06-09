import defaultTheme from '@mapbox/mapbox-gl-draw/src/lib/theme.js'

const drawStyles = [
  ...defaultTheme.filter((style) => style.id !== 'gl-draw-line-inactive'),
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
    'id': 'pam-snap-guide',
    'type': 'line',
    'filter': ['all', ['==', '$type', 'LineString'], ['==', 'user_isSnapGuide', 'true']],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round',
    },
    'paint': {
      'line-color': '#404040',
      'line-width': 2,
      'line-opacity': 0.25
    },
  }
]

export default drawStyles
