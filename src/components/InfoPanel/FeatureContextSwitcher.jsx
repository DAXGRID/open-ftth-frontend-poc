import React, { useContext } from "react";
import CurrentFeatureContext from "../../hooks/CurrentFeatureContext";
import FeatureInfoPanel from "./Feature";
import FeatureListInfoPanel from "./FeatureList";
import BreakoutToSplicePointForm from "./ActionForm/BreakoutToSplicePoint";

const FeatureContextSwitcher = () => {
  const { currentFeature, breakoutToSplicePoint } = useContext(CurrentFeatureContext);
  console.log('FeatureContextSwitcher')
  console.log(currentFeature)

  if (currentFeature && breakoutToSplicePoint) {
    console.log('breakoutToSplicePoint')
    return (
      <BreakoutToSplicePointForm
        data={breakoutToSplicePoint}
        currentFeature={currentFeature}
      />
    );
  } else if (
    currentFeature &&
    (currentFeature.routeNode || currentFeature.routeSegment)
  ) {
    return <FeatureInfoPanel />;
  } else {
    return <FeatureListInfoPanel />;
  }
};

export default FeatureContextSwitcher;
