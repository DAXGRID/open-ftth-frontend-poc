import React, { useContext } from "react";
import { Tab } from "react-bootstrap";
import _ from "lodash";
import ConduitsTable from "./ConduitsTable";
import ConduitDetail from "./ConduitDetail";
import conduitsData from "./tableData/conduitsData";
import CurrentFeatureContext from "hooks/CurrentFeatureContext.jsx";

const ConduitsTab = ({ eventKey }) => {
  const [conduitsByRelation, setConduitsByRelation] = React.useState([]);
  const [showRelationHeader, setShowRelationHeader] = React.useState(false);
  const { currentFeature, setHighlightedFeature } = useContext(
    CurrentFeatureContext
  );

  React.useEffect(() => {
    if (!currentFeature) return;

    const conduits = conduitsData(currentFeature);
    setConduitsByRelation(_(conduits)
      .groupBy(conduit => conduit.relationType)
      .value());

  // Only show grouping header for selected nodes
    setShowRelationHeader(currentFeature.routeNode);
  }, [currentFeature]);


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

  const tableSection = relationType => {
    return (
      <div key={relationType}>
        {showRelationHeader && (
          <h5 className="title">{_.capitalize(relationType)}</h5>
        )}
        <ConduitsTable
          data={conduitsByRelation[relationType]}
          onSelectRow={setHighlightedFeature}
          expandedRow={expandedRow}
        />
        <br />
        <br />
      </div>
    );
  };

  return (
    <Tab.Pane eventKey={eventKey}>
      {_.keysIn(conduitsByRelation)
        .sort()
        .map(relationType => tableSection(relationType))}
    </Tab.Pane>
  );
};

export default ConduitsTab;
