const reducer = (state = {}, action = '') => {
  switch (action.type) {
    case 'CREATE_FEATURES':
      return Object.assign({}, state, {
        features: [
          ...state.features,
          ...action.features
        ]
      })
    case 'DELETE_FEATURES':
      const deleted_indexes = action.features.map((feature) => feature.id ).filter(Boolean)
      return Object.assign({}, state, {
        features: [
          ...state.features.filter((feature) => !deleted_indexes.includes(feature.id))
        ]
      })
    default:
      return state
  }
}

export default reducer

export const getFeatures = (state) =>
  state.features
