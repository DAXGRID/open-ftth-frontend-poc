import React, { useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { PanelGroup, Panel, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { type } from "os";

const ConduitsTab = ({ currentFeature, eventKey }) => {
  const { t } = useTranslation();
  const conduits = currentFeature.relatedConduits;
  console.log("conduits");
  console.log(conduits);

  const length = line => {
    // get last conduitSegment because child conduits return parent conduitSegment first (?)
    const conduitSegment = line.allConduitSegments.slice(-1)[0];
    console.log("conduitSegment");

    console.log(conduitSegment);
    if (conduitSegment)
      return conduitSegment.allRouteSegments[0].length.toFixed(2);
  };

  const type = conduit => {
    if (conduit.assetInfo) {
      return conduit.assetInfo.model.name;
    } else {
      return conduit.name;
    }
  };

  const location = conduit => {
    const address = conduit.toRouteNode.locationInfo.accessAddress;
    return `${address.houseNumber} ${address.streetName}`;
  };

  const innerConduitsData = children => {
    if (!children) return;
    return children.map(child => {
      const line = child.line;
      const conduit = child.conduit;

      return {
        id: conduit.id,
        color: conduit.color,
        type: type(conduit),
        length: length(line)
        // location: location(conduit)
      };
    });
  };

  const conduitsTableData = conduits.map(({ conduitSegment }) => {
    const conduit = conduitSegment.conduit;
    const line = conduitSegment.line;

    return {
      id: conduit.id,
      color: conduit.color,
      colorMarking: conduit.colorMarking,
      type: type(conduit),
      length: length(line),
      location: location(conduit),
      innerConduits: innerConduitsData(conduitSegment.children)
    };
  });

  console.log("conduitsTableData");
  console.log(conduitsTableData);

  const sortCaret = (order, column) => {
    if (!order) return <span style={{ cursor: "pointer" }}>▼</span>;
    else if (order === "asc")
      return <span style={{ cursor: "pointer" }}>▼</span>;
    else if (order === "desc")
      return <span style={{ cursor: "pointer" }}>▲</span>;
    return null;
  };

  const colorFormatter = (cell, row) => {
    let title, borderColor;
    const colorMap = {
      CLEAR: "#eeeeee",
      AQUA: "#00FFFF",
      WHITE: "#ffffff",
      BROWN: "#964B00",
      RED: "#FF0000",
      YELLOW: "#FFFF00",
      BLUE: "#0000FF",
      ORANGE: "#FF7F00",
      GREEN: "#00B200",
      PINK: "#ff5def",
      BLACK: "#000",
      GREY: "#808080",
      VIOLET: "#7F00FF"
    };

    const backgroundColor = colorMap[cell];
    if (cell === "CLEAR") {
      title = `CLEAR WITH ${row.colorMarking} MARKING`;
      borderColor = colorMap[row.colorMarking];
    } else {
      title = cell;
      borderColor = colorMap[cell];
    }
    return (
      <span
        title={title}
        className="color-swatch"
        style={{ backgroundColor: backgroundColor, borderColor: borderColor }}
      />
    );
  };

  const conduitsTableColumns = [
    {
      text: "",
      dataField: "color",
      formatter: colorFormatter
    },
    {
      text: "Type",
      dataField: "type",
      sort: true,
      sortCaret: sortCaret
    },
    {
      text: "To Location",
      dataField: "location",
      sort: true,
      sortCaret: sortCaret
    },
    {
      text: "Length",
      dataField: "length",
      sort: true,
      sortCaret: sortCaret
    }
  ];
  const rowStyle = { cursor: "pointer" };

  const nonExpandableIDs = () => {
    const foo = conduitsTableData
      .filter(item => !item.innerConduits)
      .map(item => item.id);
    console.log("nonExpandableIDs");

    console.log(foo);
    return foo;
  };

  const expandRow = {
    onlyOneExpanding: true,
    showExpandColumn: true,
    expandColumnPosition: "right",
    nonExpandable: nonExpandableIDs(),

    renderer: row => (
      <BootstrapTable
        keyField="id"
        data={row.innerConduits}
        columns={conduitsTableColumns}
        // rowStyle={rowStyle}
        bordered={false}
        striped
        hover
        condensed
      />
    )
  };

  return (
    <Tab.Pane eventKey={eventKey}>
      <BootstrapTable
        keyField="id"
        data={conduitsTableData}
        columns={conduitsTableColumns}
        expandRow={expandRow}
        rowStyle={rowStyle}
        bordered={false}
        striped
        hover
        condensed
      />
    </Tab.Pane>
  );
};

export default ConduitsTab;
