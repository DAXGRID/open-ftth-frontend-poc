export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return {
        // avoid totally empty state
        features: [{
          id: "01",
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
            name: 'Initial point'
          }
        }]
      }
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // Ignore write errors.
  }
}
