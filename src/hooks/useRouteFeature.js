import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

const GET_ROUTE_FEATURE = gql`
  query GetRouteFeature ($id: ID!) {
    routeNode(id: $id) {
      id
      name
      nodeFunctionKind
      nodeKind
      locationInfo {
        accessAddress {
          houseNumber
          streetName
          municipalCode
          municipalRoadCode
          postalCode
          postalName
        }
        direction
      }
    }
  }
`;

export default (id) => {
  return useQuery(GET_ROUTE_FEATURE, {
    variables: { id }
  });
};
