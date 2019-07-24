import React, { useContext } from "react";
import CurrentFeatureContext from "../../hooks/CurrentFeatureContext";
import FeatureInfoPanel from "./Feature";
import FeatureListInfoPanel from "./FeatureList";

const FeatureContextSwitcher = () => {
  const { currentFeature, setCurrentFeatureID } = useContext(
    CurrentFeatureContext
  );
  if (currentFeature && (currentFeature.routeNode || currentFeature.routeSegment)) {
    return (
      <FeatureInfoPanel
        currentFeature={currentFeature}
        setCurrentFeatureID={setCurrentFeatureID}
      />
    );
  } else {
    return <FeatureListInfoPanel setCurrentFeatureID={setCurrentFeatureID} />;
  }
}

export default FeatureContextSwitcher;
