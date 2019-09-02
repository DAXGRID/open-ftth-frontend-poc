import React, { useContext } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, ButtonToolbar, Tab, Panel } from "react-bootstrap";
// import { useTranslation } from "react-i18next";
import CurrentFeatureContext from "hooks/CurrentFeatureContext.jsx";
import ConduitDetail from "./ConduitDetail.jsx";
import { conduitsData, conduitsColumns } from "./data";

const ConduitsTab = ({ currentFeature, eventKey }) => {
  // const { t } = useTranslation();

  const conduits = currentFeature.relatedConduits;
  const data = conduitsData(conduits, currentFeature.id);

  const {
    highlightedFeature,
    setHighlightedFeature,
    setBreakoutToSplicePoint
  } = useContext(CurrentFeatureContext);

  // console.log("conduits");
  // console.log(conduits);

  console.log("formatted conduitsData");
  console.log(data);

  console.log("highlightedFeature");
  console.log(highlightedFeature);

  const breakoutToSplicePoint = ({ id, nodeID, name, multiConduitID }) => {
    setBreakoutToSplicePoint({ id, nodeID, name, multiConduitID });
    console.log("breakoutToSplicePoint");
    console.log(id);
    console.log(name);
    console.log(currentFeature);
  };

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    hideSelectColumn: true,
    // TODO fix expand/or select but not both bug (should do both at once, maybe just hooks issue?)
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        setHighlightedFeature(row);
      }
    },
    clickToExpand: true
  };

  const nonExpandableIDs = data
    .filter(item => !item.innerConduits)
    .map(item => item.id);

  const rowStyle = { cursor: "pointer" };

  const defaultSorted = [
    {
      dataField: "position",
      order: "asc"
    }
  ];

  const expandRow = {
    showExpandColumn: true,
    expandColumnPosition: "right",
    // nonExpandable: nonExpandableIDs,

    renderer: row => {
      if (row.innerConduits) {
        return (
          <BootstrapTable
            keyField="id"
            data={row.innerConduits}
            columns={conduitsColumns}
            defaultSorted={defaultSorted}
            selectRow={selectRow}
            expandRow={expandRow}
            rowStyle={rowStyle}
            bordered={false}
            striped
            hover
            condensed
          />
        );
      } else {
        return (
          <ConduitDetail
            data={row}
            breakoutToSplicePoint={breakoutToSplicePoint}
          />
        );
      }
    }
  };

  return (
    <Tab.Pane eventKey={eventKey}>
      <BootstrapTable
        keyField="id"
        data={data}
        columns={conduitsColumns}
        defaultSorted={defaultSorted}
        selectRow={selectRow}
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
