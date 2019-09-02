import React from "react";
import gridPosition from "./gridPosition";
import CytoscapeComponent from "react-cytoscapejs";

const ExampleDiagram = data => {
  const width = 300;
  const height = 300;

  // Using custom script with position instead of layouts, since
  // cytoscape layouts don't load with React components for some reason.
  const pos = gridPosition({
    width: width,
    height: height,
    cols: 2,
    rows: 2
  });

  const elements = [
    {
      data: { id: "one", label: "Node 1" },
      position: { x: pos.x(0), y: pos.y(0) }
    },
    {
      data: { id: "two", label: "Node 2" },
      position: { x: pos.x(1), y: pos.y(0) }
    },
    {
      data: { id: "three", label: "Node 3" },
      position: { x: pos.x(0), y: pos.y(1) }
    },
    {
      data: { id: "four", label: "Node 4" },
      position: { x: pos.x(1), y: pos.y(1) }
    },
    {
      data: {
        id: "1-2",
        source: "one",
        target: "two",
        label: "Edge from Node1 to Node2"
      }
    },
    {
      data: {
        id: "3-4",
        source: "three",
        target: "four",
        label: "Edge from Node3 to Node4"
      }
    }
  ];

  return (
    <CytoscapeComponent
      elements={elements}
      style={{ width: `${width}px`, height: `${height}px`, backgroundColor: "#eee" }}
    />
  );
};

export default ExampleDiagram;
