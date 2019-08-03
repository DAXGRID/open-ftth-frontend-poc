import React, { useContext } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Tab } from "react-bootstrap";
// import { useTranslation } from "react-i18next";
import CurrentFeatureContext from "hooks/CurrentFeatureContext.jsx";
import { conduitsData, conduitsColumns } from "./data";

const ConduitsTab = ({ currentFeature, eventKey }) => {
  // const { t } = useTranslation();

  const conduits = currentFeature.relatedConduits;
  const data = conduitsData(conduits);

  const { highlightedFeature, setHighlightedFeature } = useContext(
    CurrentFeatureContext
  );

  console.log("conduits");
  console.log(conduits);

  console.log("formatted conduitsData");
  console.log(data);

  console.log("highlightedFeature");
  console.log(highlightedFeature);

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
    clickToExpand: true,

  };

  const nonExpandableIDs = data
    .filter(item => !item.innerConduits)
    .map(item => item.id);

  const rowStyle = { cursor: "pointer" };

  const defaultSorted = [{
    dataField: 'position',
    order: 'asc'
  }];

  const expandRow = {
    onlyOneExpanding: true,
    showExpandColumn: true,
    expandColumnPosition: "right",
    nonExpandable: nonExpandableIDs,

    renderer: row => (
      <BootstrapTable
        keyField="id"
        data={row.innerConduits}
        columns={conduitsColumns}
        defaultSorted={ defaultSorted } 
        selectRow={selectRow}
        rowStyle={rowStyle}
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
        data={data}
        columns={conduitsColumns}
        defaultSorted={ defaultSorted } 
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
