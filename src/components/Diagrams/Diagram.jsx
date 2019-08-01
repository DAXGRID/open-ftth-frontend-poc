import React from "react";
import * as SRD from "storm-react-diagrams";
require("storm-react-diagrams/dist/style.min.css");

const Diagram = props => {
  const engine = new SRD.DiagramEngine();

  engine.installDefaultFactories();

  const model = new SRD.DiagramModel();
  const nodes = props.data.nodes.map(node => {
    const newNode = new SRD.DefaultNodeModel(node.name, node.color);
    newNode.portsOut = node.out.map(port => {
      return newNode.addOutPort(port.name);
    });
    newNode.portsIn = node.in.map(port => {
      return newNode.addInPort(port.name);
    });

    return newNode;
  });

  nodes[0].setPosition("5%", "10%");
  nodes[1].setPosition("62%", "10%");

  const links = nodes[0].portsOut.map(portOut => {
    const portIn = nodes[1].portsIn.find(port => portOut.label === port.label);
    console.log("linking:");
    console.log(portOut);
    console.log(portIn);
    return portOut.link(portIn);
  });

  const items = nodes.concat(links);
  model.addAll(...items);
  model.setLocked(true);

  engine.setDiagramModel(model);

  // var props = {
  //   diagramEngine: engine,
  //   allowLooseLinks: false,
  //   allowCanvasTranslation: false,
  //   allowCanvasZoom: false
  // };

  return (
    <div className="docs-preview-wrapper">
      <SRD.DiagramWidget
        className="diagram-widget srd-demo-canvas"
        {...props}
      />
    </div>
  );
};
export default Diagram;
