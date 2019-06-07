const reducer = (state = {}, action = '') => {
  switch (action.type) {
    case 'UPDATE_CURRENT_USER':
      if (!state.users) return
      const user = state.users[action.id]
      if (!user) return

      return Object.assign({}, state, {
        currentUserID: action.id
      })
    case 'CREATE_FEATURES':
      return Object.assign({}, state, {
        features: [
          ...state.features,
          ...action.features
        ]
      })
    case 'UPDATE_FEATURES':
      const updated_indexes = action.features.map((feature) => feature.id ).filter(Boolean)

      return Object.assign({}, state, {
        features: [
          ...state.features.filter((feature) => !updated_indexes.includes(feature.id)),
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
