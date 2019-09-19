import { colorMap } from "lib/constants";

const closureStylesheet = ({ width, height, cols, rows }) => {
  const leftRightSideLength = height * 0.85;
  const topBottomSideLength = width * 0.75;
  const leftRightPortLength = (height / cols) * 0.95;
  const topBottomPortLength = (width / rows) * 0.95;

  const sideWidth = 25;

  return [
    {
      selector: "node",
      style: {
        width: 20,
        height: 20,
        shape: "rectangle"
      }
    },
    {
      selector: "edge",
      style: {
        width: 15
      }
    },
    {
      selector: "node[id *= 'side']",
      style: {
        shape: "rectangle",
        "background-color": "#ddd"
      }
    },
    {
      selector: "node[id *= 'top']",
      style: {
        shape: "rectangle",
        width: topBottomSideLength,
        height: sideWidth
      }
    },
    {
      selector: "node[id *= 'bottom']",
      style: {
        shape: "rectangle",
        width: topBottomSideLength,
        height: sideWidth
      }
    },
    {
      selector: "node[id *= 'left']",
      style: {
        shape: "rectangle",
        width: sideWidth,
        height: leftRightSideLength
      }
    },
    {
      selector: "node[id *= 'right']",
      style: {
        shape: "rectangle",
        width: sideWidth,
        height: leftRightSideLength
      }
    },
    {
      selector: "node[id *= 'port']",
      style: {
        shape: "rectangle",
        width: 10,
        height: leftRightPortLength,
        "z-index": 2,
        content: "data(name)",
        "text-valign": "center"
      }
    },
    {
      selector: "node[id *= 'port-top']",
      style: {
        width: 30,
        height: 10,
        content: "data(name)",
        "text-valign": "center"
      }
    },
    {
      selector: "node[id *= 'terminal']",
      style: {
        shape: "rectangle",
        width: 15,
        height: "label",
        label: "data(name)",
        "z-index": 1,
        "font-size": 10,
        "text-valign": "center",
        "text-outline-width": 2,
        "text-outline-color": "#ddd"
      }
    },
    {
      selector: "node[id *= 'terminal-top']",
      style: {
        shape: "rectangle",
        width: 10,
        height: 15,
        label: "data(name)",
        "z-index": 3,
        "font-size": 10,
        "text-valign": "bottom",
        "text-halign": "right",
        "text-margin-x": 5,
        "text-outline-width": 2,
        "text-outline-color": "#ddd"
      }
    },
    {
      selector: "node[id *= 'left']",
      style: {
        "text-halign": "right",
        "text-margin-x": 5
      }
    },
    {
      selector: "node[id *= 'right']",
      style: {
        "text-halign": "left",
        "text-margin-x": -5
      }
    },
    {
      selector: "edge[id *= 'port']",
      style: {
        width: leftRightPortLength,
        "line-color": "#ddd"
      }
    },
    {
      selector: "edge[id *= 'terminal']",
      style: {
        width: 2,
        "line-color": "#555"
      }
    },
    {
      selector: "[id *= 'CLEAR']",
      style: {
        "background-color": colorMap["CLEAR"]
        // "line-color": colorMap["CLEAR"]
      }
    },
    {
      selector: "[id *= 'AQUA']",
      style: {
        "background-color": colorMap["AQUA"]
        // "line-color": colorMap["AQUA"]
      }
    },
    {
      selector: "[id *= 'WHITE']",
      style: {
        "background-color": colorMap["WHITE"]
        // "line-color": colorMap["WHITE"]
      }
    },
    {
      selector: "[id *= 'BROWN']",
      style: {
        "background-color": colorMap["BROWN"]
        // "line-color": colorMap["BROWN"]
      }
    },
    {
      selector: "[id *= 'RED']",
      style: {
        "background-color": colorMap["RED"]
        // "line-color": colorMap["RED"]
      }
    },
    {
      selector: "[id *= 'YELLOW']",
      style: {
        "background-color": colorMap["YELLOW"]
        // "line-color": colorMap["YELLOW"]
      }
    },
    {
      selector: "[id *= 'BLUE']",
      style: {
        "background-color": colorMap["BLUE"]
        // "line-color": colorMap["BLUE"]
      }
    },
    {
      selector: "[id *= 'ORANGE']",
      style: {
        "background-color": colorMap["ORANGE"]
        // "line-color": colorMap["ORANGE"]
      }
    },
    {
      selector: "[id *= 'GREEN']",
      style: {
        "background-color": colorMap["GREEN"]
        // "line-color": colorMap["GREEN"]
      }
    },
    {
      selector: "[id *= 'PINK']",
      style: {
        "background-color": colorMap["PINK"]
        // "line-color": colorMap["PINK"]
      }
    },
    {
      selector: "[id *= 'BLACK']",
      style: {
        "background-color": colorMap["BLACK"]
        // "line-color": colorMap["BLACK"]
      }
    },
    {
      selector: "[id *= 'GREY']",
      style: {
        "background-color": colorMap["GREY"]
        // "line-color": colorMap["GREY"]
      }
    },
    {
      selector: "[id *= 'VIOLET']",
      style: {
        "background-color": colorMap["VIOLET"]
        // "line-color": colorMap["VIOLET"]
      }
    }
  ];
};

export default closureStylesheet;
