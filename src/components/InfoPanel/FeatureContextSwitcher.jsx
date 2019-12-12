import React, { useContext } from "react";
import CurrentFeatureContext from "../../hooks/CurrentFeatureContext";
import FeatureInfoPanel from "./Feature";
import FeatureListInfoPanel from "./FeatureList";

const FeatureContextSwitcher = () => {
  const { currentFeature } = useContext(CurrentFeatureContext);
  
  if (
    currentFeature &&
    (currentFeature.routeNode || currentFeature.routeSegment)
  ) {
    return <FeatureInfoPanel />;
  } else {
    return <FeatureListInfoPanel />;
  }
};

export default FeatureContextSwitcher;
