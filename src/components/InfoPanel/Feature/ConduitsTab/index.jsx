import React, { useContext } from "react";
import { Tab } from "react-bootstrap";
import _ from "lodash";
import ConduitsTable from "./ConduitsTable";
import ConduitDetail from "./ConduitDetail";
import conduitsData from "./tableData/conduitsData";
import CurrentFeatureContext from "hooks/CurrentFeatureContext.jsx";

const ConduitsTab = ({ eventKey }) => {
  const { currentFeature, setHighlightedFeature } = useContext(
    CurrentFeatureContext
  );
  const conduits = conduitsData(currentFeature);
  const conduitsByRelation = _(conduits)
    .groupBy(conduit => conduit.relationType)
    .value();

  console.log(conduitsByRelation);
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
      {_.keysIn(conduitsByRelation).sort().map(relationType => {
        return (
          <div key={relationType}>
            <h5 className="title">{_.capitalize(relationType)}</h5>
            <ConduitsTable
              data={conduitsByRelation[relationType]}
              onSelectRow={setHighlightedFeature}
              expandedRow={expandedRow}
            />
            <br />
            <br />
          </div>
        );
      })}
    </Tab.Pane>
  );
};

export default ConduitsTab;
