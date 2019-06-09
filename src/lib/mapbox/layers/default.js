const defaultLayers = (map) => {
  map.addLayer({
    id: 'default-line',
    type: 'line',
    source: 'features',
    filter: ['all',
      ['==', '$type', 'LineString'],
      ['!has', 'physicalType']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#000',
      'line-width': 1
    }
  })

  map.addLayer({
    id: 'default-circle',
    type: 'circle',
    source: 'features',
    filter: ['all',
      ['==', '$type', 'Point'],
      ['!has', 'physicalType']
    ],
    'paint': {
      'circle-radius': 2,
      'circle-color': '#000'
    }
  })
}

export default defaultLayers
