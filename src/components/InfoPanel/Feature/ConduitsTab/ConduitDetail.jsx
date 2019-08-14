import React from "react";
import { Table } from "react-bootstrap";

const ConduitDetail = ({ data }) => {
  const line = data.conduitSegment.line;
  const lineConduitSegments = line.allConduitSegments;
  const conduit = data.conduit;

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
      <div
        className="panel panel-default"
        style={{ margin: "0" }}
        key={conduit.id}
      >
        <div class="panel-body">
          <strong>
            <span>Segments</span>
            <span className="pull-right">Total Dist: {totalLength}</span>
          </strong>
        </div>

        <ul class="list-group">
          {lineConduitSegments.map(lineConduitSegment => {
            const conduit = lineConduitSegment.conduit;
            const parent = lineConduitSegment.conduit.parent;

            let length = lineConduitSegment.allRouteSegments
              .map(routeSegment => routeSegment.length)
              .reduce((totalLength, length) => totalLength + length);
            length = parseFloat(length).toFixed(2);

            if (parent) {
              return (
                <li class="list-group-item" key={conduit.id}>
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
                <li class="list-group-item" key={conduit.id}>
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
      </div>
    </div>
  );
};

export default ConduitDetail;
