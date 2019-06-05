export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null || serializedState === {}) {
      console.log('missing state')
      return {
        currentUserID: 0,
        users: [{
          id: 0,
          name: 'Planner User',
          role: 'planner',
          canEditAll: true,
          canEditCustomerConnections: true,
          canViewAll: true,
          isPlanner: true,
          avatar: 'https://i.pravatar.cc/100?img=32'
        },{
          id: 1,
          name: 'Installer User',
          role: 'installer',
          canEditAll: false,
          canEditCustomerConnections: true,
          canViewAll: true,
          isInstaller: true,
          avatar: 'https://i.pravatar.cc/100?img=8'
        },{
          id: 2,
          name: 'Viewer User',
          role: 'viewer',
          canEditAll: false,
          canEditCustomerConnections: false,
          canViewAll: true,
          isViewer: true,
          avatar: 'https://i.pravatar.cc/100?img=5'
        }],
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
            pam: 'true'
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
            pam: 'true'
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
            pam: 'true'
          }
        }]
      }
    }
    console.log('state')
    console.log(serializedState)

    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  console.log('savestate')
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // Ignore write errors.
  }
}
