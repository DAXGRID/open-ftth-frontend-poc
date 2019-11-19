import React from "react";
import _ from "lodash";
import { Glyphicon, ListGroup, ListGroupItem } from "react-bootstrap";
import {
  isCable,
  isInnerConduit,
  isOuterConduit,
  isClosure
} from "./FeatureLogic";
import { ATTACH_CONDUIT_TO_CLOSURE } from "hooks/useDiagramService";
import { useMutation } from "react-apollo-hooks";
import CurrentFeatureContext from "../../hooks/CurrentFeatureContext";

const DiagramActions = ({ currentDiagramFeatures, currentFeature }) => {
  const { setCurrentFeature, setCurrentFeatureID } = React.useContext(
    CurrentFeatureContext
  );

  const attachConduitToClosure = useMutation(ATTACH_CONDUIT_TO_CLOSURE, {
    update: (proxy, mutationResult) => {}
  });

  const canAddToClosure = () => {
    return (
      (currentDiagramFeatures.length === 2 &&
        isOuterConduit(currentDiagramFeatures[0]) &&
        isClosure(currentDiagramFeatures[1])) ||
      (isOuterConduit(currentDiagramFeatures[1]) &&
        isClosure(currentDiagramFeatures[0]))
    );
  };

  const canCutOuterConduit = () => {
    return (
      currentDiagramFeatures.length === 1 &&
      isOuterConduit(currentDiagramFeatures[0])
    );
  };

  const canCutInnerConduit = () => {
    return (
      currentDiagramFeatures.length === 1 &&
      isInnerConduit(currentDiagramFeatures[0])
    );
  };

  const canConnectInnerConduit = () => {
    return (
      currentDiagramFeatures.length === 2 &&
      isInnerConduit(currentDiagramFeatures[0]) &&
      isInnerConduit(currentDiagramFeatures[1])
    );
  };

  const canRouteCableThroughInnerConduit = () => {
    return (
      (currentDiagramFeatures.length === 2 &&
        isCable(currentDiagramFeatures[0]) &&
        isInnerConduit(currentDiagramFeatures[1])) ||
      (isCable(currentDiagramFeatures[1]) &&
        isInnerConduit(currentDiagramFeatures[0]))
    );
  };

  const onAddToClosure = e => {
    e.preventDefault();
    const outerConduit = currentDiagramFeatures.find(feature => {
      return isOuterConduit(feature);
    });

    const closure = currentDiagramFeatures.find(feature => {
      return isClosure(feature);
    });

    if (!outerConduit || !closure) {
      return;
    }
    const conduitId = outerConduit.properties.refId;
    const conduitClosureId = closure.properties.refId;

    console.log("attaching");
    console.log(conduitId);
    console.log(conduitClosureId);

    attachConduitToClosure({
      variables: {
        conduitId,
        conduitClosureId
      }
    });

    const _currentFeature = currentFeature;
    const dataType = _currentFeature.nodeKind ? "route_node" : "route_segment";

    // reload pane with new data
    setCurrentFeature(null);
    setCurrentFeatureID({
      id: _currentFeature.id,
      type: dataType
    });
  };

  const onClick = () => {
    console.log("clicked");
  };

  React.useEffect(() => {
    console.log("currentDiagramFeatures changed");
    console.log(currentDiagramFeatures);
  }, [currentDiagramFeatures]);

  return (
    <>
      <ListGroup>
        <ListGroupItem>
          <h5>Selected Items</h5>
          <p>
            {currentDiagramFeatures.length > 0 &&
              currentDiagramFeatures.map(feature => (
                <span key={feature.properties.featureType}>
                  {_.startCase(feature.properties.featureType)}
                  {feature.properties.label.length > 0 &&
                    feature.properties.label !== "null" && (
                      <span> - {feature.properties.label}</span>
                    )}
                  {currentDiagramFeatures.length > 1 &&
                    feature === currentDiagramFeatures[0] && <span> & </span>}
                </span>
              ))}
            {currentDiagramFeatures.length === 0 && <span>None</span>}
          </p>
        </ListGroupItem>

        {canAddToClosure() && (
          <ListGroupItem onClick={onAddToClosure}>
            <Glyphicon style={{ marginRight: "10px" }} glyph="log-in" />
            <span className="text-primary" className="text-primary">
              Add to Well/Closure
            </span>
          </ListGroupItem>
        )}

        {canCutOuterConduit() && (
          <ListGroupItem onClick={onClick}>
            <Glyphicon style={{ marginRight: "10px" }} glyph="scissors" />
            <span className="text-primary">Cut Outer Conduit</span>
          </ListGroupItem>
        )}

        {canCutInnerConduit() && (
          <ListGroupItem onClick={onClick}>
            <Glyphicon style={{ marginRight: "10px" }} glyph="scissors" />
            <span className="text-primary">Cut Inner Conduit</span>
          </ListGroupItem>
        )}

        {canConnectInnerConduit() && (
          <ListGroupItem onClick={onClick}>
            <Glyphicon style={{ marginRight: "10px" }} glyph="link" />
            <span className="text-primary">Connect Inner Conduit</span>
          </ListGroupItem>
        )}

        {canRouteCableThroughInnerConduit() && (
          <ListGroupItem onClick={onClick}>
            <Glyphicon style={{ marginRight: "10px" }} glyph="log-in" />
            <span className="text-primary">
              Route Cable Through Inner Conduit
            </span>
          </ListGroupItem>
        )}
      </ListGroup>
    </>
  );
};

export default DiagramActions;
