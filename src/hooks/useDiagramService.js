import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

export const GET_DIAGRAM_SERVICE = gql`
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
    skip: skipQuery
  });
};
