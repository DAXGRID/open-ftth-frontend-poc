import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'

const GET_ROUTE_FEATURES = gql`
  {
    routeNodes {
      id
      name
      nodeKind
      nodeFunctionKind
      geometry {
        type
        coordinates
      }
    }

    routeSegments {
      id
      segmentKind
      geometry {
        type
        coordinates
      }
    }
  }
`

export default () => {
  return useQuery(GET_ROUTE_FEATURES)
}
