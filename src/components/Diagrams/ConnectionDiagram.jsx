import React from "react";
import sizeMe from "react-sizeme";
import cytoscape from "cytoscape";

const ConnectionDiagram = props => {
  const { width, height } = props.size;
  const [diagramContainer, setDiagramContainer] = React.useState();

  // const updateDimensions = () => {
  //   setWindowSize({
  //     width: diagramContainer.width,
  //     height: diagramContainer.height
  //   });
  // };

  React.useLayoutEffect(() => {
    // debugger;

    setDiagramContainer(document.getElementById(props.containerID));
    // updateDimensions();
    // window.addEventListener("resize", updateDimensions);

    const cy = cytoscape({
      container: diagramContainer,

      elements: [
        // list of graph elements to start with
        { data: { id: "a", color: "#ccc", label: "Cabinet A" } },
        { data: { id: "b", color: "#ccc", label: "Cabinet B" } },

        {
          data: {
            id: "aa",
            label: "",
            parent: "a",
            color: "#00A",
            position: { x: 115, y: 20 }
          }
        },
        {
          data: {
            id: "ba",
            label: "",
            parent: "b",
            color: "#00A",
            position: { x: 215, y: 20 }
          }
        },
        {
          data: {
            id: "aa-ba",
            label: "",
            source: "aa",
            target: "ba",
            color: "#00A"
          }
        },

        {
          data: {
            id: "ab",
            label: "",
            parent: "a",
            color: "#0A0",
            position: { x: 115, y: 30 }
          }
        },
        {
          data: {
            id: "bb",
            label: "",
            parent: "b",
            color: "#0A0",
            position: { x: 215, y: 30 }
          }
        },
        {
          data: {
            id: "ab-bb",
            label: "",
            source: "ab",
            target: "bb",
            color: "#0A0"
          }
        }
      ],

      style: [
        {
          selector: "node",
          css: {
            shape: "rectangle",
            padding: "10px",
            content: "data(label)",
            "border-width": "2px",
            "border-color": "data(color)",
            "background-color": "data(color)",
            "background-opacity": ".50",
            "text-valign": "center",
            "text-halign": "center"
          }
        },
        {
          selector: "node node",
          css: {
            shape: "rectangle",
            padding: "5px",
            content: "data(label)",
            "border-width": "2px",
            "border-color": "data(color)",
            "background-color": "data(color)",
            "background-opacity": ".50"
          }
        },
        {
          selector: ":parent",
          css: {
            "text-valign": "top",
            "text-halign": "center"
          }
        },
        {
          selector: "edge",
          css: {
            "curve-style": "bezier",
            "line-color": "data(color)",
          }
        }
      ],

      layout: {
        name: "grid",
        // positions: {
        //   aa: { x: 115, y: 20 },
        //   ba: { x: 215, y: 20 },
        // }
        // avoidOverlap: true,
        // avoidOverlapPadding: 20,
        // rows: 4,
        columns: props.columns
      }
    });

    window["cy"] = cy;
  }, [diagramContainer]);

  return (
    <div
      id={props.containerID}
      style={{ width: props.width, height: props.height }}
    >
      My size is {width || -1}px x {height || -1}px HI
    </div>
  );
};

export default sizeMe({ monitorHeight: true })(ConnectionDiagram);
