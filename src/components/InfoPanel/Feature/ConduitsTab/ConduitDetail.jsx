import React from "react";
import { Button, ButtonToolbar, Panel } from "react-bootstrap";

const ConduitDetail = ({ data, breakoutToSplicePoint }) => {
  const line = data.conduitSegment.line;
  const conduit = data.conduit;
  const lineConduitSegments = line.allSegments;

  const colorLabel = conduit => {
    let label = conduit.color;
    if (conduit.colorMarking && conduit.colorMarking !== "NONE") {
      label += `/${conduit.colorMarking}`;
    }
    return label;
  };

  let totalLength = lineConduitSegments
    .map(segment =>
      segment.allRouteSegments
        .map(routeSegment => routeSegment.length)
        .reduce((totalLength, length) => totalLength + length)
    )
    .reduce((totalLength, length) => totalLength + length);
  totalLength = parseFloat(totalLength).toFixed(2);

  return (
    <div>
      <Panel style={{ margin: "0" }} key={conduit.id}>
        <Panel.Body>
          {data.relationType === "PASS_THROUGH" && !data.closure && (
            <>
              <ButtonToolbar>
                <Button
                  onClick={() =>
                    breakoutToSplicePoint({
                      id: data.id,
                      name: data.name,
                      multiConduitID: data.multiConduitID
                    })
                  }
                  bsStyle="default"
                  bsSize="small"
                >
                  <i className="fa fa-upload"></i>
                  Breakout to Splice Point
                </Button>
              </ButtonToolbar>
              <hr />
            </>
          )}
          <strong>
            <span>Segments</span>
            <span className="pull-right">Total Dist: {totalLength}</span>
          </strong>
        </Panel.Body>

        <ul className="list-group">
          {lineConduitSegments.map(lineConduitSegment => {
            const conduit = lineConduitSegment.conduit;
            const parent = lineConduitSegment.conduit.parent;

            let length = lineConduitSegment.allRouteSegments
              .map(routeSegment => routeSegment.length)
              .reduce((totalLength, length) => totalLength + length);
            length = parseFloat(length).toFixed(2);

            if (parent) {
              return (
                <li className="list-group-item" key={conduit.id}>
                  <dt>
                    {parent.kind}
                    <span className="pull-right">{length}</span>
                  </dt>

                  <dt>Outer Conduit</dt>
                  <dd>
                    {parent.name} {colorLabel(parent)}
                  </dd>
                  <dt>Inner Conduit</dt>
                  <dd>
                    {conduit.name} {colorLabel(conduit)}
                  </dd>
                </li>
              );
            } else {
              return (
                <li className="list-group-item" key={conduit.id}>
                  <dt>
                    {conduit.kind}
                    <span className="pull-right">{length}</span>
                  </dt>
                  <dt>Conduit</dt>
                  <dd>
                    {conduit.name} {colorLabel(conduit)}
                  </dd>
                </li>
              );
            }
          })}
        </ul>
      </Panel>
    </div>
  );
};

export default ConduitDetail;
