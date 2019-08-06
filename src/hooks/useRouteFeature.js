import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

const GET_ROUTE_FEATURE = gql`
  query GetRouteFeature($id: ID!) {
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
      }
      relatedConduits(
        includeMultiConduits: true
        includeInnerConduits: false
        includeSingleConduits: true
      ) {
        relationType
        conduit {
          id
          assetInfo {
            model {
              name
            }
          }
          color
          colorMarking
          position
          name
          allRouteSegments {
            id
            geometry {
              coordinates
              type
            }
          }
        }
        conduitSegment {
          line {
            startRouteNode {
              name
              locationInfo {
                accessAddress {
                  houseNumber
                  streetName
                }
              }
            }
         	  endRouteNode {
              name
              locationInfo {
                accessAddress {
                  houseNumber
                  streetName
                }
              }
            }
            allConduitSegments {
              conduit {
                id
                name
                color
                colorMarking
              }
              allRouteSegments {
                id
                length
                geometry {
                  coordinates
                  type
                }
              }
            }
          }
          children {
            line {
              startRouteNode {
                name
                locationInfo {
                  accessAddress {
                    houseNumber
                    streetName
                  }
                }
              }
               endRouteNode {
                name
                locationInfo {
                  accessAddress {
                    houseNumber
                    streetName
                  }
                }
              }
              allConduitSegments {
                conduit {
                  id
                  name
                  color
                  colorMarking
                }
                allRouteSegments {
                  id
                  length
                  geometry {
                    coordinates
                    type
                  }
                }
              }
            }
            conduit {
              id
              name
              color
              colorMarking
              position
              assetInfo {
                model {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default id => {
  // React complains if we conditionally call this hook
  const skipQuery = !id;
  return useQuery(GET_ROUTE_FEATURE, {
    variables: { id },
    skip: skipQuery
  });
};
