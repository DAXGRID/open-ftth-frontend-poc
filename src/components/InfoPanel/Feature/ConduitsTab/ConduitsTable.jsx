import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {
  iconFormatter,
  colorFormatter,
  addressFormatter
} from "./tableData/formatters";
import { useTranslation } from "react-i18next";

const ConduitsTable = ({ data, onSelectRow, expandedRow }) => {
  const { t } = useTranslation();

  const conduitsColumns = [
    {
      text: "",
      dataField: "icon",
      formatter: iconFormatter
    },
    {
      text: "",
      dataField: "position"
    },
    {
      text: t("From"),
      dataField: "from",
      formatter: addressFormatter
    },
    {
      text: t("To"),
      dataField: "to",
      formatter: addressFormatter
    }
  ];

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    hideSelectColumn: true,
    // TODO fix expand/or select but not both bug (should do both at once, maybe just hooks issue?)
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        onSelectRow(row);
      }
    },
    clickToExpand: true
  };

  const expandRow = {
    showExpandColumn: true,
    expandColumnPosition: "right",

    renderer: row => expandedRow(row)
  };

  const defaultSorted = [
    {
      dataField: "position",
      order: "asc"
    }
  ];

  const rowStyle = { cursor: "pointer" };

  return (
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
  );
};

export default ConduitsTable;
