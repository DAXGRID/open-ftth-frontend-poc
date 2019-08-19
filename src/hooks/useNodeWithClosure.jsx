import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

const GET_NODE_WITH_CONDUIT_CLOSURE = gql`
  query GetNodeWithConduitClosure($id: ID!) {
    routeNode(id: $id) {
      id
      name
      conduitClosure {
        id
        sides {
          position
          ports {
            position
            diagramLabel
            connectionKind
            connectedToPort
            connectedToSide
            multiConduitSegment {
              conduit {
                color
              }
            }
            terminals {
              diagramLabel
              connectionKind
            }
          }
        }
      }
    }
  }
`

const useClosure = (id) => {
  // React complains if we conditionally call this hook
  const skipQuery = !id;
  return useQuery(GET_NODE_WITH_CONDUIT_CLOSURE, {
    variables: { id },
    skip: skipQuery
  });
};

export default useClosure