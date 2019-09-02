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
  mutation placeClosure($nodeID: ID!) {
    conduitService {
      conduitClosure {
        placeConduitClosure(pointOfInterestId: $nodeID) {
          id
          sides {
            digramLabel
            position
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
  const { setBreakoutToSplicePoint } = useContext(CurrentFeatureContext);
  
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }
  const placeClosure = useMutation(PLACE_CLOSURE, {
    update: (proxy, mutationResult) => {
      console.log("placeClosure");
      console.log(mutationResult);
      // only create closure if doesn't exist data.createClosure
      // chain here
    },
    variables: { nodeID: currentFeature.routeNode.id }
  });

  const createBreakoutToSplicePoint = () => {
    console.log('createBreakoutToSplicePoint currentFeature')
    console.log(currentFeature)
    if(!currentFeature.routeNode.conduitClosure) {
      placeClosure();
    }

    setBreakoutToSplicePoint(null);
  }
  
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
                  <Button onClick={createBreakoutToSplicePoint} bsStyle="info" fill>
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
