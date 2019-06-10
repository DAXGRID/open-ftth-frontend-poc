export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null || serializedState === {}) {
      // console.log('missing state')
      return {
        currentUserID: 1,
        users: {
          0: {
            id: 0,
            name: 'Planner User',
            role: 'planner',
            permissions: {
              editableFeatureTypes: ['duct', 'cabinet', 'customer_connection'],
            },
            avatar: 'https://i.pravatar.cc/100?img=32'
          },
          1: {
            id: 1,
            name: 'Installer User',
            role: 'installer',
            permissions: {
              editableFeatureTypes: ['customer_connection'],
              canOnlyAddToExistingFeatureLayers: {
                lines: { cabinet: 'physical-type-cabinet' }
              }
            },
            avatar: 'https://i.pravatar.cc/100?img=8'
          },
          2: {
            id: 2,
            name: 'Viewer User',
            role: 'viewer',
            editableFeatureTypes: [],
            avatar: 'https://i.pravatar.cc/100?img=5',
            permissions: {}
          }
        },
        features: [{
          id: '01',
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [-122.29032365729391, 37.91208121972484],
              [-122.29059698830892, 37.9126896462859],
              [-122.29063603559678, 37.91290914070834],
              [-122.29060675013326, 37.91321720194698]
            ]
          },
          properties: {
            name: 'Initial line',
            pam: 'true',
            physicalType: 'duct',
            state: 'complete'
          }
        }, {
          id: '02',
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-122.29032365729391, 37.91208121972484]
          },
          properties: {
            name: 'Initial point',
            pam: 'true',
            physicalType: 'cabinet',
            state: 'complete'
          }
        }, {
          id: '03',
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-122.29060675013326, 37.91321720194698]
          },
          properties: {
            name: 'Initial point',
            pam: 'true',
            physicalType: 'cabinet',
            state: 'complete'
          }
        }]
      }
    }
    // console.log('state')
    // console.log(serializedState)

    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  // console.log('savestate')
  // console.log(state)
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // Ignore write errors.
  }
}
