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
import { useMutation } from "@apollo/react-hooks";
import CurrentFeatureContext from "../../hooks/CurrentFeatureContext";
import ClickContext from "hooks/ClickContext";
import DiagramContext from "hooks/DiagramContext";

const DiagramActions = () => {
  const {
    diagramFeatures,
    pointOfInterestID,
    selectedDiagramFeatures,
    setLoadingDiagram
  } = React.useContext(DiagramContext);

  const [contextMenu, setContextMenu] = React.useState({
    active: false,
    top: null,
    left: null
  });
  const { clickEvent } = React.useContext(ClickContext);

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

  React.useEffect(() => {
    if (!cutOuterConduitData) return;
    debugger;
  }, [cutOuterConduitData]);

  const [attachConduitToClosure, { attachConduitToClosureData }] = useMutation(
    ATTACH_CONDUIT_TO_CLOSURE,
    {
      update: (proxy, mutationResult) => {},
      refetchQueries: () => ["GetDiagramService"],
      awaitRefetchQueries: true
    }
  );

  const [cutOuterConduit, { cutOuterConduitData }] = useMutation(
    CUT_OUTER_CONDUIT,
    {
      update: (proxy, mutationResult) => {},
      refetchQueries: () => ["GetDiagramService"],
      awaitRefetchQueries: true
    }
  );

  const [cutInnerConduit, { cutInnerConduitData }] = useMutation(
    CUT_INNER_CONDUIT,
    {
      update: (proxy, mutationResult) => {},
      refetchQueries: () => ["GetDiagramService"],
      awaitRefetchQueries: true
    }
  );

  const [connectInnerConduit, { connectInnerConduitData }] = useMutation(
    CONNECT_INNER_CONDUIT,
    {
      update: (proxy, mutationResult) => {},
      refetchQueries: () => ["GetDiagramService"],
      awaitRefetchQueries: true
    }
  );

  const canAddToClosure = () => {
    return (
      (selectedDiagramFeatures.length === 2 &&
        isOuterConduit(selectedDiagramFeatures[0]) &&
        isClosure(selectedDiagramFeatures[1])) ||
      (isOuterConduit(selectedDiagramFeatures[1]) &&
        isClosure(selectedDiagramFeatures[0]))
    );
  };

  const canCutOuterConduit = () => {
    return (
      selectedDiagramFeatures.length === 1 &&
      isOuterConduit(selectedDiagramFeatures[0])
    );
  };

  const canCutInnerConduit = () => {
    return (
      selectedDiagramFeatures.length === 1 &&
      isInnerConduit(selectedDiagramFeatures[0])
    );
  };

  const canConnectInnerConduit = () => {
    return (
      (selectedDiagramFeatures.length === 2 &&
        isInnerConduit(selectedDiagramFeatures[0]) &&
        isInnerConduit(selectedDiagramFeatures[1])) ||
      (isOuterConduit(selectedDiagramFeatures[0]) &&
        isInnerConduit(selectedDiagramFeatures[1])) ||
      (isInnerConduit(selectedDiagramFeatures[0]) &&
        isOuterConduit(selectedDiagramFeatures[1]))
    );
  };

  const canRouteCableThroughInnerConduit = () => {
    return (
      (selectedDiagramFeatures.length === 2 &&
        isCable(selectedDiagramFeatures[0]) &&
        isInnerConduit(selectedDiagramFeatures[1])) ||
      (isCable(selectedDiagramFeatures[1]) &&
        isInnerConduit(selectedDiagramFeatures[0]))
    );
  };

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
    setLoadingDiagram(true);

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
    setLoadingDiagram(true);

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
    setLoadingDiagram(true);

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
    setLoadingDiagram(true);

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
              selectedDiagramFeatures.length > 0 &&
              selectedDiagramFeatures.map(feature => (
                <span key={feature.properties.featureType}>
                  {_.startCase(feature.properties.featureType)}
                  {feature.properties.label &&
                    feature.properties.label.length &&
                    feature.properties.label !== "null" && (
                      <span> - {feature.properties.label}</span>
                    )}
                  {selectedDiagramFeatures.length > 1 &&
                    feature === selectedDiagramFeatures[0] && <span> & </span>}
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
          {canAddToClosure() && (
            <MenuItem onSelect={onAddToClosure}>
              <Glyphicon style={{ marginRight: "10px" }} glyph="log-in" />
              <span className="text-primary" className="text-primary">
                Add to Well/Closure
              </span>
            </MenuItem>
          )}

          {canCutOuterConduit() && (
            <MenuItem onSelect={onCutOuterConduit}>
              <Glyphicon style={{ marginRight: "10px" }} glyph="scissors" />
              <span className="text-primary">Cut Outer Conduit</span>
            </MenuItem>
          )}

          {canCutInnerConduit() && (
            <MenuItem onSelect={onCutInnerConduit}>
              <Glyphicon style={{ marginRight: "10px" }} glyph="scissors" />
              <span className="text-primary">Cut Inner Conduit</span>
            </MenuItem>
          )}

          {canConnectInnerConduit() && (
            <MenuItem onSelect={onConnectInnerConduit}>
              <Glyphicon style={{ marginRight: "10px" }} glyph="link" />
              <span className="text-primary">Connect Inner Conduit</span>
            </MenuItem>
          )}

          {canRouteCableThroughInnerConduit() && (
            <MenuItem onSelect={onConnectInnerConduit}>
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
