const reducer = (state = {}, action = '') => {
  switch (action.type) {
    case 'UPDATE_CURRENT_USER_BY_ROLE':
      if (!state.users) return
      const user = state.users.filter((user) => user.role === action.role)[0]
      if (!user) return
      const userID = user.id

      return Object.assign({}, state, {
        currentUserID: userID
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
