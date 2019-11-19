import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo-hooks";

const GET_DIAGRAM_SERVICE = gql`
  query GetDiagramService($id: ID!) {
    diagramService {
      buildRouteNodeDiagram(routeNodeId: $id) {
        diagramObjects {
          label
          style
          refId
          refClass
          geometry {
            type
            coordinates
          }
        }
      }
    }
  }
`;

export default (id, loading) => {
  let query;

  // React complains if we conditionally call this hook
  const skipQuery = !id || loading;
  console.log("useDiagramService")
  return useQuery(GET_DIAGRAM_SERVICE, {
    variables: { id },
    skip: skipQuery,
    fetchPolicy: "no-cache"
  });
};


export const ATTACH_CONDUIT_TO_CLOSURE = gql`
mutation AddConduitClosure($conduitClosureId: ID!, $conduitId: ID!) {
  conduitService {
    conduitClosure {
      attachPassByConduitToClosure(
        conduitClosureId: $conduitClosureId
        conduitId: $conduitId
        incommingSide: LEFT
        outgoingSide: RIGHT
      ) {
        id
      }
    }
  }
}
`;


export const CUT_OUTER_CONDUIT = gql`
mutation cutOuterConduitCommand($pointOfInterestId: ID!, $multiConduitId: ID!) {
  conduitService {
    multiConduit {
      cutOuterConduitCommand(
        pointOfInterestId: $pointOfInterestId
        multiConduitId: $multiConduitId
      ) {
        id
      }
    }
  }
}
`;
