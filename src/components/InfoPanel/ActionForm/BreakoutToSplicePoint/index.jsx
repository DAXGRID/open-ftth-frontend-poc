import React, { useContext } from "react";
import Card from "../../../Card/Card.jsx";
import { Row, Col, Form, FormGroup, ControlLabel } from "react-bootstrap";

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

  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  const placeClosureMutation = useMutation(PLACE_CLOSURE, {
    update: (proxy, mutationResult) => {
      console.log("placeClosureMutation");
      console.log(mutationResult);
      // figure out how to check if this should be done or not

      attachPassByMutation();
      // only create closure if doesn't exist data.createClosure
      // chain here
    },
    variables: { nodeID: currentFeature.routeNode.id },
    refetchQueries: [
      {
        query: UPDATE_CONDUIT_QUERY,
        variables: { id: currentFeature.routeNode.id }
      }
    ]
  });

  const attachPassByMutation = useMutation(ATTACH_PASSBY, {
    update: (proxy, mutationResult) => {
      console.log("attachPassByMutation");
      console.log(mutationResult);
    },
    variables: {
      closureID: currentFeature.routeNode.conduitClosure.id ? currentFeature.routeNode.conduitClosure.id : null,
      conduitID: data.multiConduitID
    },
    refetchQueries: [
      {
        query: UPDATE_CONDUIT_QUERY,
        variables: { id: currentFeature.routeNode.id }
      }
    ]
  });

  const createBreakoutToSplicePoint = () => {
    console.log("createBreakoutToSplicePoint currentFeature");
    console.log(currentFeature);
    if (!currentFeature.routeNode.conduitClosure) {
      placeClosureMutation();
    } else {
      // figure out how to check if this should be done or not
      attachPassByMutation();      
    }

    setBreakoutToSplicePoint(null);
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
                  <ControlLabel>Choose Conduit End</ControlLabel>
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
