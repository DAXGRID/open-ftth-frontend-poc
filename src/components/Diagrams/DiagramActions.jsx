import React from "react";
import { Alert, Collapse, ListGroup, ListGroupItem } from "react-bootstrap";
import { isCable, isInnerConduit, isOuterConduit } from "./FeatureLogic";

const DiagramActions = ({
  currentDiagramFeatures,
  setCurrentDiagramFeatures
}) => {
  const onClick = e => {
    console.log("onClick");
  };

  const canAddToWell = () => {
    return (currentDiagramFeatures.count === 1 && isOuterConduit(currentDiagramFeatures[0]))
  };

  React.useEffect(() => {
    console.log("currentDiagramFeatures changed") 
    console.log(currentDiagramFeatures)
  }, [currentDiagramFeatures])

  return (
    <>
      <ListGroup variant="flush">
        {canAddToWell && (
          <ListGroupItem>
            <i className="nc-icon nc-air-baloon"></i>
            <a onClick={onClick}>Add to Well</a>
            <Alert bsStyle="danger">
              <span>This is a plain notification</span>
            </Alert>
          </ListGroupItem>
        )}
        <ListGroupItem>
          <i className="nc-icon nc-air-baloon"></i>
          <a onClick={onClick}>Cut Outer Conduit</a>
        </ListGroupItem>
        <ListGroupItem>
          <i className="nc-icon nc-air-baloon"></i>
          <a disabled onClick={onClick}>
            Cut Inner Conduit
          </a>
        </ListGroupItem>
        <ListGroupItem>
          <i className="nc-icon nc-air-baloon"></i>
          <a disabled onClick={onClick}>
            Connect Inner Conduit
          </a>
        </ListGroupItem>
        <ListGroupItem>
          <i className="nc-icon nc-air-baloon"></i>
          <a disabled onClick={onClick}>
            Route Cable Through Inner Conduit
          </a>
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

export default DiagramActions;
