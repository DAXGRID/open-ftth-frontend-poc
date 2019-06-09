const infrastructureLayers = (map) => {
  map.addLayer({
    id: 'physical-type-duct',
    type: 'line',
    source: 'features',
    filter: ['all',
      ['==', '$type', 'LineString'],
      ['==', 'physicalType', 'duct']
    ],
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': '#111',
      'line-width': 2
    }
  })

  map.addLayer({
    id: 'physical-type-cabinet',
    type: 'circle',
    source: 'features',
    filter: ['all',
      ['==', '$type', 'Point'],
      ['==', 'physicalType', 'cabinet']
    ],
    'paint': {
      'circle-radius': 3,
      'circle-color': '#111'
    }
  })
}

export default infrastructureLayers
