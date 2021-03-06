import React from "react";
import _ from "lodash";
import {
  Col,
  Glyphicon,
  Dropdown,
  ListGroup,
  ListGroupItem,
  MenuItem
} from "react-bootstrap";
import {
  isInnerConduit,
  isOuterConduit,
  isClosure,
  canAddToClosure,
  canCutOuterConduit,
  canCutInnerConduit,
  canConnectInnerConduits,
  canRouteCableThroughConduits
} from "./FeatureLogic";
import {
  ATTACH_CONDUIT_TO_CLOSURE,
  CUT_OUTER_CONDUIT,
  CUT_INNER_CONDUIT,
  CONNECT_INNER_CONDUIT,
  PLACE_FIBER_CABLE_WITHIN_CONDUIT
} from "hooks/useDiagramService";
import { useMutation } from "@apollo/react-hooks";
import ClickContext from "hooks/ClickContext";
import DiagramContext from "hooks/DiagramContext";

const DiagramActions = () => {
  const {
    pointOfInterestID,
    selectedDiagramFeatures,
    setLoadingDiagram,
    setErrorMessage
  } = React.useContext(DiagramContext);

  const [contextMenu, setContextMenu] = React.useState({
    active: false,
    top: null,
    left: null
  });
  const { clickEvent } = React.useContext(ClickContext);

  const updateCallback = React.useCallback(() => {
    setLoadingDiagram(true);
  }, [setLoadingDiagram]);

  React.useEffect(() => {
    if (clickEvent) {
      setContextMenu({
        active: true,
        top: clickEvent.layerY + 130,
        left: clickEvent.layerX + 20
      });
    } else {
      setContextMenu({
        active: false,
        top: clickEvent ? clickEvent.top : null,
        left: clickEvent ? clickEvent.left : null
      });
    }
  }, [clickEvent]);

  const [attachConduitToClosure, attachConduitToClosureResult] = useMutation(
    ATTACH_CONDUIT_TO_CLOSURE,
    {
      update: (proxy, mutationResult) => {},
      refetchQueries: () => ["GetDiagramService"],
      awaitRefetchQueries: true
    }
  );

  const [cutOuterConduit, cutOuterConduitResult] = useMutation(
    CUT_OUTER_CONDUIT,
    {
      update: (proxy, mutationResult) => {},
      refetchQueries: () => ["GetDiagramService"],
      awaitRefetchQueries: true
    }
  );

  const [cutInnerConduit, cutInnerConduitResult] = useMutation(
    CUT_INNER_CONDUIT,
    {
      update: (proxy, mutationResult) => {},
      refetchQueries: () => ["GetDiagramService"],
      awaitRefetchQueries: true
    }
  );

  const [connectInnerConduit, connectInnerConduitResult] = useMutation(
    CONNECT_INNER_CONDUIT,
    {
      update: (proxy, mutationResult) => {},
      refetchQueries: () => ["GetDiagramService"],
      awaitRefetchQueries: true
    }
  );

  React.useEffect(() => {
    if (attachConduitToClosureResult.error)
      setErrorMessage(attachConduitToClosureResult.error);
    if (cutOuterConduitResult.error)
      setErrorMessage(cutOuterConduitResult.error);
    if (cutInnerConduitResult.error)
      setErrorMessage(cutInnerConduitResult.error);
    if (connectInnerConduitResult.error)
      setErrorMessage(connectInnerConduitResult.error);
  }, [
    attachConduitToClosureResult,
    cutOuterConduitResult,
    cutInnerConduitResult,
    connectInnerConduitResult,
    setErrorMessage
  ]);

  const [placeFiberCableWithinConduit] = useMutation(
    PLACE_FIBER_CABLE_WITHIN_CONDUIT,
    {
      update: (proxy, mutationResult) => {},
      refetchQueries: () => ["GetDiagramService"],
      awaitRefetchQueries: true
    }
  );

  const onAddToClosure = () => {
    const outerConduit = selectedDiagramFeatures.find(feature => {
      return isOuterConduit(feature);
    });

    const closure = selectedDiagramFeatures.find(feature => {
      return isClosure(feature);
    });

    if (!outerConduit || !closure) {
      return;
    }

    updateCallback();

    const conduitId = outerConduit.properties.refId;
    const conduitClosureId = closure.properties.refId;

    attachConduitToClosure({
      variables: {
        conduitId,
        conduitClosureId
      }
    });
  };

  const onCutOuterConduit = () => {
    const outerConduit = selectedDiagramFeatures.find(feature => {
      return isOuterConduit(feature);
    });

    if (!outerConduit) {
      return;
    }

    updateCallback();

    const multiConduitId = outerConduit.properties.refId;
    const pointOfInterestId = pointOfInterestID;

    cutOuterConduit({
      variables: {
        multiConduitId,
        pointOfInterestId
      }
    });
  };

  const onCutInnerConduit = () => {
    const innerConduit = selectedDiagramFeatures.find(feature => {
      return isInnerConduit(feature);
    });

    if (!innerConduit) {
      return;
    }

    updateCallback();

    const innerConduitId = innerConduit.properties.refId;
    const pointOfInterestId = pointOfInterestID;

    cutInnerConduit({
      variables: {
        innerConduitId,
        pointOfInterestId
      }
    });
  };

  const onConnectInnerConduit = () => {
    const fromConduit = selectedDiagramFeatures[0];
    const toConduit = selectedDiagramFeatures[1];

    if (!fromConduit || !toConduit) {
      return;
    }

    updateCallback();

    const fromConduitSegmentId = fromConduit.properties.refId;
    const toConduitSegmentId = toConduit.properties.refId;
    const pointOfInterestId = pointOfInterestID;

    connectInnerConduit({
      variables: {
        pointOfInterestId,
        fromConduitSegmentId,
        toConduitSegmentId
      }
    });
  };

  const onRouteCableThroughConduits = () => {
    const cable = selectedDiagramFeatures[0];
    const fromConduit = selectedDiagramFeatures[1];
    const toConduit = selectedDiagramFeatures[2];

    if (!cable || !fromConduit || !toConduit) {
      return;
    }

    updateCallback();

    const cableSegmentId = cable.properties.refId;
    const conduitSegmentId1 = fromConduit.properties.refId;
    const conduitSegmentId2 = toConduit.properties.refId;

    placeFiberCableWithinConduit({
      variables: {
        cableSegmentId,
        conduitSegmentId1,
        conduitSegmentId2
      }
    });
  };

  const onToggle = () => {
    // must have an onToggle for the dropdown
    return;
  };

  return (
    <>
      <ListGroup>
        <ListGroupItem>
          <h5>Selected Items</h5>
          <p>
            {selectedDiagramFeatures &&
              selectedDiagramFeatures.map((feature, index) => (
                <span key={feature.properties.featureType}>
                  {_.startCase(feature.properties.featureType)}
                  {feature.properties.label &&
                    feature.properties.label.length &&
                    feature.properties.label !== "null" && (
                      <span> - {feature.properties.label}</span>
                    )}
                  {index < selectedDiagramFeatures.length - 1 && (
                    <span> & </span>
                  )}
                </span>
              ))}
            {!selectedDiagramFeatures ||
              (!selectedDiagramFeatures.length && <span>None</span>)}
          </p>
        </ListGroupItem>
      </ListGroup>
      <Dropdown
        id="contextMenu"
        open={contextMenu.active}
        onToggle={onToggle}
        style={{
          position: "absolute",
          top: contextMenu.top,
          left: contextMenu.left
        }}
      >
        <Col bsRole="toggle"></Col>

        <Dropdown.Menu>
          {canAddToClosure(selectedDiagramFeatures) && (
            <MenuItem onSelect={onAddToClosure}>
              <Glyphicon style={{ marginRight: "10px" }} glyph="log-in" />
              <span className="text-primary">Add to Well/Closure</span>
            </MenuItem>
          )}

          {canCutOuterConduit(selectedDiagramFeatures) && (
            <MenuItem onSelect={onCutOuterConduit}>
              <Glyphicon style={{ marginRight: "10px" }} glyph="scissors" />
              <span className="text-primary">Cut Outer Conduit</span>
            </MenuItem>
          )}

          {canCutInnerConduit(selectedDiagramFeatures) && (
            <MenuItem onSelect={onCutInnerConduit}>
              <Glyphicon style={{ marginRight: "10px" }} glyph="scissors" />
              <span className="text-primary">Cut Inner Conduit</span>
            </MenuItem>
          )}

          {canConnectInnerConduits(selectedDiagramFeatures) && (
            <MenuItem onSelect={onConnectInnerConduit}>
              <Glyphicon style={{ marginRight: "10px" }} glyph="link" />
              <span className="text-primary">Connect Inner Conduit</span>
            </MenuItem>
          )}

          {canRouteCableThroughConduits(selectedDiagramFeatures) && (
            <MenuItem onSelect={onRouteCableThroughConduits}>
              <Glyphicon style={{ marginRight: "10px" }} glyph="log-in" />
              <span className="text-primary">
                Route Cable Through Inner Conduit
              </span>
            </MenuItem>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default DiagramActions;
