import React, { useContext } from "react";
import { Tab } from "react-bootstrap";
import ConduitsTable from "./ConduitsTable";
import ConduitDetail from "./ConduitDetail";
import conduitsData from "./tableData/conduitsData";
import CurrentFeatureContext from "hooks/CurrentFeatureContext.jsx";

const ConduitsTab = ({ eventKey }) => {
  const { currentFeature, setHighlightedFeature } = useContext(
    CurrentFeatureContext
  );
  const data = conduitsData(currentFeature);

  const expandedRow = row => {
    if (row.innerConduits) {
      return (
        <ConduitsTable
          data={row.innerConduits}
          onSelectRow={setHighlightedFeature}
          expandedRow={expandedRow}
        />
      );
    } else {
      return <ConduitDetail data={row} />;
    }
  };

  return (
    <Tab.Pane eventKey={eventKey}>
      <ConduitsTable
        data={data}
        onSelectRow={setHighlightedFeature}
        expandedRow={expandedRow}
      />
    </Tab.Pane>
  );
};

export default ConduitsTab;
