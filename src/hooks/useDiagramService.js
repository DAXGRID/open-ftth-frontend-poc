import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

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


export const PLACE_FIBER_CABLE_WITHIN_CONDUIT = gql`
mutation placeFiberCableWithinConduit($cableSegmentId: ID!, $conduitSegmentId1: ID!, $conduitSegmentId2: ID!) {
  conduitService {
    placeFiberCableWithinConduit(
      cableSegmentId: $cableSegmentId
      conduitSegmentId1: $conduitSegmentId1
      conduitSegmentId2: $conduitSegmentId2
    ) 
  }
}
`;

export const CUT_INNER_CONDUIT = gql`
mutation cutInnerConduitCommand($pointOfInterestId: ID!, $innerConduitId: ID!) {
  conduitService {
    multiConduit {
      cutInnerConduitCommand(
        pointOfInterestId: $pointOfInterestId
        innerConduitId: $innerConduitId
      ) {
        id
      }
    }
  }
}
`;


export const CONNECT_INNER_CONDUIT = gql`
mutation connectConduitSegmentToConduitSegment($pointOfInterestId: ID!, $fromConduitSegmentId: ID!, $toConduitSegmentId: ID!) {
  conduitService {
    multiConduit {
      connectConduitSegmentToConduitSegment(
        pointOfInterestId: $pointOfInterestId
        fromConduitSegmentId: $fromConduitSegmentId
        toConduitSegmentId: $toConduitSegmentId
      ) {
        id
      }
    }
  }
}
`;