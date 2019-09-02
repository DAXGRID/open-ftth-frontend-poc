import React from "react";
import CytoscapeComponent from "react-cytoscapejs";
import closureStylesheet from "./closureStylesheet";
import closureElementFormatter from "./closureElementFormatter";

const ClosureDiagram = ({ data, width, height }) => {
  if (!data || !data.routeNode || !data.routeNode.conduitClosure) return;

  const closureData = data.routeNode.conduitClosure;
  const [elements, cols, rows] = closureElementFormatter({ closureData, width, height });
  return (
    <CytoscapeComponent
      elements={elements}
      // autolock={true}
      panningEnabled={false}
      zoomingEnabled={false}
      // autounselectify={true}
      boxSelectionEnabled={true}
      stylesheet={closureStylesheet({width, height, cols, rows})}
      style={{ width: `${width}px`, height: `${height}px`, backgroundColor: "#eee" }}
    />
  );
};

export default ClosureDiagram;
