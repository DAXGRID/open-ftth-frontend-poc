import React, { useContext } from "react";
import CurrentFeatureContext from "./CurrentFeatureContext";
import useRouteFeature from "./useRouteFeature";

// This is less of a custom React hook and more of a component wrapper.
// After trying many variations on custom react hooks, this seemed like the best
// component to handle loading currentFeature since it only happens once, above the
// map and info panel

const CurrentFeatureLoader = props => {
  const {
    currentFeatureID,
    setCurrentFeature,
    setCurrentFeatureError,
    setCurrentFeatureLoading
  } = useContext(CurrentFeatureContext);
  const loading = true;
  const response = useRouteFeature(currentFeatureID);
  
  // allowing this state to be set to null is good, will clean info panel
  setCurrentFeatureError(response.error);
  setCurrentFeatureLoading(response.loading);
  setCurrentFeature(response.data);

  console.log('loaded feature data')
  console.log(response.data)

  return <>{props.children}</>;
};

export default CurrentFeatureLoader;
