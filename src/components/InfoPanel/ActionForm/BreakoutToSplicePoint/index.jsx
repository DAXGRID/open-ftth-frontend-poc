import React, { useContext } from "react";
import Card from "../../../Card/Card.jsx";
import { Row, Col, Form, FormGroup, ControlLabel } from "react-bootstrap";
import Select from "react-select";

import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Radio from "components/CustomRadio/CustomRadio.jsx";

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { useTranslation } from "react-i18next";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import CurrentFeatureContext from "../../../../hooks/CurrentFeatureContext";

const PLACE_CLOSURE = gql`
  mutation placeClosureMutation($nodeID: ID!) {
    conduitService {
      conduitClosure {
        placeConduitClosure(pointOfInterestId: $nodeID) {
          id
        }
      }
    }
  }
`;

const ATTACH_PASSBY = gql`
  mutation attachPassby($closureID: ID!, $conduitID: ID!) {
    conduitService {
      conduitClosure {
        attachPassByConduitToClosure(
          conduitClosureId: $closureID
          conduitId: $conduitID
          incommingSide: LEFT
          outgoingSide: RIGHT
        ) {
          id
        }
      }
    }
  }
`;

const ATTACH_TO_END_CONDUIT = gql`
  mutation {
    conduitService {
      conduitClosure {
        attachConduitEndToClosure(
          conduitClosureId: $closureID
          conduitId: $conduitID
          side: TOP
        ) {
          id
        }
      }
    }
  }
`;

const UPDATE_CONDUIT_QUERY = gql`
  query UpdateCache($id: ID!) {
    routeNode(id: $id) {
      id
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
                name
                color
              }
            }
            terminals {
              position
              diagramLabel
              connectionKind
              connectedToTerminal
              connectedToPort
              lineSegment {
                conduit {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  }
`;

const BreakoutToSplicePointForm = ({ data, currentFeature }) => {
  console.log("breakoutConduit");
  console.log(data);

  const { t } = useTranslation();
  const [inputs, setInputs] = React.useState({});
  const { setBreakoutToSplicePoint, setCurrentFeatureID } = useContext(
    CurrentFeatureContext
  );

  let closureID;

  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  // const placeClosureMutation = useMutation(PLACE_CLOSURE, {
  //   update: (proxy, mutationResult) => {
  //     console.log("placeClosureMutation");
  //     console.log(mutationResult);
  //   },
  //   variables: { nodeID: currentFeature.routeNode.id },
  //   // refetchQueries: [
  //   //   {
  //   //     query: UPDATE_CONDUIT_QUERY,
  //   //     variables: { id: currentFeature.routeNode.id }
  //   //   }
  //   // ]
  // });

  // const attachPassByMutation = useMutation(ATTACH_PASSBY, {
  //   update: (proxy, mutationResult) => {
  //     console.log("attachPassByMutation");
  //     console.log(mutationResult);
  //   },
  //   variables: {
  //     closureID: closureID,
  //     conduitID: data.multiConduitID
  //   },
  //   refetchQueries: [
  //     {
  //       query: UPDATE_CONDUIT_QUERY,
  //       variables: { id: currentFeature.routeNode.id }
  //     }
  //   ]
  // });

  // const attachToEndConduit = useMutation(ATTACH_TO_END_CONDUIT, {
  //   update: (proxy, mutationResult) => {
  //     console.log("attachToEndConduit");
  //     console.log(mutationResult);
  //   },
  //   variables: {
  //     closureID: closureID,
  //     conduitID: inputs["endConduit"]
  //   },
  //   skip: !closureID || !inputs["endConduit"],
  //   refetchQueries: [
  //     {
  //       query: UPDATE_CONDUIT_QUERY,
  //       variables: { id: currentFeature.routeNode.id }

  //     }
  //   ]
  // });

  // React.useLayoutEffect(() => {
  //   console.log("closureID");
  //   console.log(closureID);
  //   placeClosureMutation();
  // });

  // React.useEffect(() => {
  //   attachToEndConduit()
  // }, [closureID]);

  const createBreakoutToSplicePoint = () => {
    // console.log("createBreakoutToSplicePoint currentFeature");
    // console.log(currentFeature);
    // // if (!currentFeature.routeNode.conduitClosure) {
    // // placeClosureMutation();
    // attachPassByMutation();
    // // }
    // // Handle these cases later
    // //  else if (currentFeature.routeNode.conduitClosure) {
    // //   if (!passThroughIDs().includes(data.multiConduitID)) {
    // //     attachPassByMutation();
    // //   }
    // // }
    setBreakoutToSplicePoint(null);
  };

  // const passThroughIDs = () => {
  //   if (!currentFeature.routeNode.conduitClosure) return;
  //   return currentFeature.routeNode.conduitClosure.sides.flatMap(side => {
  //     return side.ports
  //       .filter(port => {
  //         if (port.connectionKind === "PASS_THROUGH") {
  //           return port;
  //         }
  //       })
  //       .map(port => {
  //         return port.multiConduitSegment.conduit.id;
  //       });
  //   });
  // };

  const outgoingConduitOptions = () => {
    if (!currentFeature.routeNode) return;
    const outgoingConduits = currentFeature.routeNode.relatedConduits.filter(
      conduit => {
        if (conduit.relationType === "OUTGOING") {
          return conduit;
        }
      }
    );

    const options = outgoingConduits.map(conduit => {
      return {
        value: conduit.conduit.id,
        label: `${conduit.conduit.assetInfo.model.name} ${conduit.conduit.name}`
      };
    });

    return options;
  };

  return (
    <Card
      title={`Breakout ${data.name} To Splice Point`}
      content={
        <Row className="clearfix">
          <Col sm={12}>
            <Form>
              <fieldset>
                <FormGroup>
                  <ControlLabel>Choose Incoming Conduit End</ControlLabel>
                  <Col sm={10}>
                    <Radio
                      // number="5"
                      option="1"
                      name="radio"
                      onChange={handleInputChange}
                      checked={true}
                      label="Feeding Pipe"
                    />
                    <Radio
                      // number="6"
                      option="2"
                      name="radio"
                      onChange={handleInputChange}
                      // checked={false}
                      label="Transit Pipe"
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Choose Outgoing Conduit</ControlLabel>
                  <Select
                    className="react-select primary"
                    classNamePrefix="react-select"
                    name="endConduit"
                    value={inputs["endConduit"]}
                    onChange={value => setInputs({ endConduit: value })}
                    options={outgoingConduitOptions()}
                    placeholder="Single Select"
                  />
                </FormGroup>
                <FormGroup>
                  <Button
                    onClick={createBreakoutToSplicePoint}
                    bsStyle="info"
                    fill
                  >
                    Submit
                  </Button>
                </FormGroup>
              </fieldset>
            </Form>
          </Col>
        </Row>
      }
    />
  );
};

export default BreakoutToSplicePointForm;
