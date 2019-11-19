import React from "react";
import _ from "lodash";
import { Glyphicon, ListGroup, ListGroupItem } from "react-bootstrap";
import {
  isCable,
  isInnerConduit,
  isOuterConduit,
  isClosure
} from "./FeatureLogic";
import {
  ATTACH_CONDUIT_TO_CLOSURE,
  CUT_OUTER_CONDUIT,
  CUT_INNER_CONDUIT,
  CONNECT_INNER_CONDUIT
} from "hooks/useDiagramService";
import { useMutation } from "react-apollo-hooks";
import CurrentFeatureContext from "../../hooks/CurrentFeatureContext";

const DiagramActions = ({ currentDiagramFeatures, currentFeature }) => {
  const { setCurrentFeature, setCurrentFeatureID } = React.useContext(
    CurrentFeatureContext
  );

  const attachConduitToClosure = useMutation(ATTACH_CONDUIT_TO_CLOSURE, {
    update: (proxy, mutationResult) => {}
  });

  const cutOuterConduit = useMutation(CUT_OUTER_CONDUIT, {
    update: (proxy, mutationResult) => {}
  });

  const cutInnerConduit = useMutation(CUT_INNER_CONDUIT, {
    update: (proxy, mutationResult) => {}
  });

  const connectInnerConduit = useMutation(CONNECT_INNER_CONDUIT, {
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

    attachConduitToClosure({
      variables: {
        conduitId,
        conduitClosureId
      }
    });

    reload();
  };

  const onCutOuterConduit = e => {
    e.preventDefault();
    const outerConduit = currentDiagramFeatures.find(feature => {
      return isOuterConduit(feature);
    });

    if (!outerConduit) {
      return;
    }

    const multiConduitId = outerConduit.properties.refId;
    const pointOfInterestId = currentFeature.id;

    cutOuterConduit({
      variables: {
        multiConduitId,
        pointOfInterestId
      }
    });

    reload();
  };

  const onCutInnerConduit = e => {
    e.preventDefault();
    const innerConduit = currentDiagramFeatures.find(feature => {
      return isInnerConduit(feature);
    });

    if (!innerConduit) {
      return;
    }

    const innerConduitId = innerConduit.properties.refId;
    const pointOfInterestId = currentFeature.id;

    cutInnerConduit({
      variables: {
        innerConduitId,
        pointOfInterestId
      }
    });

    reload();
  };

  const onConnectInnerConduit = e => {
    e.preventDefault();
    const fromConduit = currentDiagramFeatures[0]
    const toConduit = currentDiagramFeatures[1]

    if (!fromConduit || !toConduit) {
      return;
    }

    const fromConduitSegmentId = fromConduit.properties.refId;
    const toConduitSegmentId = toConduit.properties.refId;
    const pointOfInterestId = currentFeature.id;

    connectInnerConduit({
      variables: {
        pointOfInterestId,
        fromConduitSegmentId,
        toConduitSegmentId
      }
    });

    reload();
  };

  const onClick = () => {
    console.log("clicked");
  };

  const reload = () => {
    const _currentFeature = currentFeature;
    const dataType = _currentFeature.nodeKind ? "route_node" : "route_segment";

    // reload pane with new data
    setCurrentFeature(null);
    setCurrentFeatureID({
      id: _currentFeature.id,
      type: dataType
    });
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
          <ListGroupItem onClick={onCutOuterConduit}>
            <Glyphicon style={{ marginRight: "10px" }} glyph="scissors" />
            <span className="text-primary">Cut Outer Conduit</span>
          </ListGroupItem>
        )}

        {canCutInnerConduit() && (
          <ListGroupItem onClick={onCutInnerConduit}>
            <Glyphicon style={{ marginRight: "10px" }} glyph="scissors" />
            <span className="text-primary">Cut Inner Conduit</span>
          </ListGroupItem>
        )}

        {canConnectInnerConduit() && (
          <ListGroupItem onClick={onConnectInnerConduit}>
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
