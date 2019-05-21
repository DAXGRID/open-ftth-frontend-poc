const reducer = (state = {}, action = '') => {
  switch (action.type) {
    case 'ADD_ROUTE_SEGMENT':
      return Object.assign({}, state, {
        routeSegments: [
          ...state.routeSegments,
          action.routeSegment
        ]
      })
    case 'ADD_NODE':
      return Object.assign({}, state, {
        nodes: [
          ...state.nodes,
          {
            node: action.node
          }
        ]
      })
    default:
      return state
  }
}

export default reducer

export const getRouteSegments = (state) =>
  state.routeSegments
