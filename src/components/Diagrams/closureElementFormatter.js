import gridPosition from "./gridPosition";
import { parse } from "querystring";

const closureElementFormatter = ({ closureData, width, height }) => {
  let sidePortCount, sideTerminalCount;
  let sides = [];
  let ports = [];
  let terminals = [];
  let edges = [];

  const cols = () => {
    // parse max needed top/bottom columns, plus standard layout columns?
    return 3;
  };

  const rows = () => {
    // parse max needed left/right rows, plus standard layout rows?
    return 4;
  };

  // Using custom script with position instead of layouts, since
  // cytoscape layouts don't load with React components for some reason.
  const gridPos = gridPosition({
    width: width,
    height: height,
    cols: cols(),
    rows: rows()
  });

  const leftCol = 0;
  const rightCol = cols() - 1;
  const centerCol = rightCol / 2;
  const topRow = 0;
  const bottomRow = rows() - 1;
  const centerRow = bottomRow / 2;

  const sidePosition = name => {
    let x, y;
    switch (name) {
      case "top": {
        x = gridPos.x(centerCol);
        y = gridPos.y(topRow);
        break;
      }
      case "left": {
        x = gridPos.x(leftCol);
        y = gridPos.y(centerRow);
        break;
      }
      case "right": {
        x = gridPos.x(rightCol);
        y = gridPos.y(centerRow);
        break;
      }
      case "bottom": {
        x = gridPos.x(centerCol);
        y = gridPos.y(bottomRow);
        break;
      }
      default: {
        console.error("Invalid side");
        console.error(name);
        break;
      }
    }
    return {
      x,
      y
    };
  };

  const portPosition = (name, position) => {
    // 1 port per row/col
    let x, y;
    const step = 0.075; // step in from outer edge
    const positionStep = 1;
    const colPos = position * positionStep;
    const rowPos = position * positionStep;

    switch (name) {
      case "top": {
        x = gridPos.x(colPos);
        y = gridPos.y(topRow + step);
        break;
      }
      case "left": {
        x = gridPos.x(leftCol + step);
        y = gridPos.y(rowPos);
        break;
      }
      case "right": {
        x = gridPos.x(rightCol - step);
        y = gridPos.y(rowPos);
        break;
      }
      case "bottom": {
        x = gridPos.x(colPos);
        y = gridPos.y(bottomRow - step);
        break;
      }
      default: {
        console.error("Invalid port");
        console.error(name);
        break;
      }
    }
    return {
      x,
      y
    };
  };

  const terminalPosition = (name, position, port, totalTerminals) => {
    // each terminal is set at a percentage of the port row/col
    let x, y;
    const step = 0.125; // step in from outer edge
    const terminalEndSpacing = 1; // leave a gap above and below terminal list
    const recenterSpacing = 0.5; // terminals will start drawing at center of port, bump it up half a row
    const portIndex = port - recenterSpacing; // top of port
    const terminalSpacing = totalTerminals + terminalEndSpacing;
    const terminalStep = terminalSpacing > 0 ? 1 / terminalSpacing : 0.2;
    const colPos = position * terminalStep;
    const rowPos = position * terminalStep;

    switch (name) {
      case "top": {
        x = gridPos.x(portIndex + colPos);
        y = gridPos.y(topRow + step);
        break;
      }
      case "left": {
        x = gridPos.x(leftCol + step);
        y = gridPos.y(portIndex + rowPos);
        break;
      }
      case "right": {
        x = gridPos.x(rightCol - step);
        y = gridPos.y(portIndex + rowPos);
        break;
      }
      case "bottom": {
        x = gridPos.x(portIndex + colPos);
        y = gridPos.y(bottomRow - step);
        break;
      }
      default: {
        console.error("Invalid port");
        console.error(name);
        break;
      }
    }
    return {
      x,
      y
    };
  };

  const parseData = () => {
    if (!closureData) return;

    sides = closureData.sides.map(side => {
      const sideName = side.position.toLowerCase();

      // ex. 'side-right'
      const sideID = `side-${sideName}`;

      side.ports.map(port => {
        console.error('port')
        console.error(port)

        const portColor = port.multiConduitSegment ? port.multiConduitSegment.conduit.color : "ORANGE";
        // ex. 'port-left-1'
        const portID = `port-${sideName}-${port.position}-${portColor}`;

        if (port.connectionKind == "PASS_THROUGH") {
          // ex. 'port-right-1'
          const connectedToSide = port.connectedToSide
            ? port.connectedToSide.toLowerCase()
            : "";
          const connectedToPort = port.connectedToPort;
          const targetPortID = `port-${connectedToSide}-${connectedToPort}-${portColor}`;

          edges.push({
            data: {
              id: `port-connection-${port.position}`,
              source: portID,
              target: targetPortID
            }
          });
        }

        port.terminals.map(terminal => {
          const connectedToSide = port.connectedToSide
            ? port.connectedToSide.toLowerCase()
            : "";

          const connectedToPort = port.connectedToPort;
          const terminalColor = terminal.lineSegment.conduit.color;
          const terminalID = `terminal-${sideName}-${port.position}-${terminal.position}-${terminalColor}`;

          if (terminal.connectionKind == "PASS_THROUGH") {
            const connectedToTerminal = terminal.connectedToTerminal;
            const targetTerminalID = `terminal-${connectedToSide}-${connectedToPort}-${connectedToTerminal}-${terminalColor}`;

            edges.push({
              data: {
                id: `terminal-connection-${port.position}-${terminal.position}-${terminalColor}`,
                source: terminalID,
                target: targetTerminalID
              }
            });
          }

          terminals.push({
            data: {
              id: terminalID,
              name: terminal.diagramLabel
            },
            position: terminalPosition(
              sideName,
              terminal.position,
              port.position,
              port.terminals.length
            )
          });
        });

        ports.push({
          data: {
            id: portID,
            name: port.diagramLabel
          },
          position: portPosition(sideName, port.position)
        });
      });

      return {
        data: {
          id: sideID,
          name: sideID
        },
        position: sidePosition(sideName)
      };
    });
  };

  parseData();

  const nodes = [...sides, ...ports, ...terminals];
  const elements = [...nodes, ...edges];
  return [elements, cols(), rows()];
};

export default closureElementFormatter;
