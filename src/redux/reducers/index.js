const reducer = (state = {}, action = '') => {
  switch (action.type) {
    case 'CREATE_FEATURES':
      return Object.assign({}, state, {
        features: [
          ...state.features,
          ...action.features
        ]
      })
    default:
      return state
  }
}

export default reducer

export const getFeatures = (state) =>
  state.features
