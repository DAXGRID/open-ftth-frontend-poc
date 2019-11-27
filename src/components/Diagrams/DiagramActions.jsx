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

const DiagramActions = ({ currentDiagramFeatures, currentFeature }) => {
  const { setCurrentFeature, setCurrentFeatureID } = React.useContext(
    CurrentFeatureContext
  );
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
        top: clickEvent.layerY + 150,
        left: clickEvent.layerX + 20
      });
    } else {
      setContextMenu({
        active: false,
        top: (clickEvent ? clickEvent.top : null),
        left: (clickEvent ? clickEvent.left : null)
      });
    }
  }, [clickEvent]);

  const [attachConduitToClosure, { attachConduitToClosureData }] = useMutation(
    ATTACH_CONDUIT_TO_CLOSURE,
    {
      update: (proxy, mutationResult) => {}
    }
  );

  const [cutOuterConduit, { cutOuterConduitData }] = useMutation(
    CUT_OUTER_CONDUIT,
    {
      update: (proxy, mutationResult) => {}
    }
  );

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
    // console.log("canCutOuterConduit")
    // console.log(currentDiagramFeatures)
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
      (currentDiagramFeatures.length === 2 &&
        isInnerConduit(currentDiagramFeatures[0]) &&
        isInnerConduit(currentDiagramFeatures[1])) ||
      (isOuterConduit(currentDiagramFeatures[0]) &&
        isInnerConduit(currentDiagramFeatures[1])) ||
      (isInnerConduit(currentDiagramFeatures[0]) &&
        isOuterConduit(currentDiagramFeatures[1]))
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

  const onAddToClosure = () => {
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

  const onCutOuterConduit = () => {
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

  const onCutInnerConduit = () => {
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

  const onConnectInnerConduit = () => {
    const fromConduit = currentDiagramFeatures[0];
    const toConduit = currentDiagramFeatures[1];

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

  const onToggle= () => {
    // must have an onToggle for the dropdown
    return;
  }

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
      </ListGroup>
      <Dropdown
        id="contextMenu"
        open={contextMenu.active}
        onToggle={onToggle}
        style={{ position: "absolute", top: contextMenu.top, left: contextMenu.left }}
      >
      <Col bsRole="toggle"></Col>

        <Dropdown.Menu >
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
