import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export const GET_ROUTE_NODE = gql`
  query GetRouteNode($id: ID!) {
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
      conduitClosure {
        id
        sides {
          ports {
            connectionKind
            multiConduitSegment {
              conduit {
                id
              }
            }
          }
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
          kind
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
            allSegments {
              conduit {
                id
                name
                kind
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
              allSegments {
                conduit {
                  id
                  name
                  kind
                  color
                  colorMarking
                  parent {
                    id
                    name
                    kind
                    color
                    colorMarking
                  }
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
              kind
              color
              colorMarking
              position
              children {
                kind
              }
              parent {
                id
                name
                kind
                color
                colorMarking
              }
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

export const GET_ROUTE_SEGMENT = gql`
  query GetRouteSegment($id: ID!) {
    routeSegment(id: $id) {
      id
      relatedConduits(
        includeMultiConduits: true
        includeInnerConduits: false
        includeSingleConduits: true
      ) {
        relationType
        conduit {
          id
          kind
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
            allSegments {
              conduit {
                id
                name
                kind
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
              allSegments {
                conduit {
                  id
                  name
                  kind
                  color
                  colorMarking
                  parent {
                    id
                    name
                    kind
                    color
                    colorMarking
                  }
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
              kind
              color
              colorMarking
              textMarking
              position
              children {
                kind
              }
              parent {
                id
                name
                kind
                color
                colorMarking
              }
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

export default ({ id, type }) => {
  let query;

  switch (type) {
    case "route_node":
      query = GET_ROUTE_NODE;
      break;
    case "route_segment":
      query = GET_ROUTE_SEGMENT;
      break;
    default:
      query = GET_ROUTE_NODE;
      break;
  }

  // React complains if we conditionally call this hook
  const skipQuery = !id;
  return useQuery(query, {
    variables: { id },
    skip: skipQuery,
    fetchPolicy: "no-cache"
  });
};
