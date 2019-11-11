import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

export const GET_DIAGRAM_SERVICE = gql`
  query GetDiagramService($id: ID!) {
    diagramService {
      buildRouteNodeDiagram(routeNodeId: $id)
       {
        diagramObjects {
          label 
          style
          geometry {
            type
            coordinates
          }
        }
      }
    }
  }
`;

export default ( id ) => {
  let query;
  console.log(`call diagramService for  ${id}`);

  // React complains if we conditionally call this hook
  const skipQuery = !id;
  return useQuery(GET_DIAGRAM_SERVICE, {
    variables: { id },
    skip: skipQuery
  });
};
