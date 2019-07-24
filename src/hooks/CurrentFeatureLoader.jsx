import React, { useContext } from "react";
import CurrentFeatureContext from "./CurrentFeatureContext";
import useRouteFeature from "./useRouteFeature";

// This is less of a custom React hook and more of a component wrapper.
// After trying many variations on custom react hooks, this seemed like the best
// component to handle loading currentFeature since it only happens once, above the
// map and info panel

const CurrentFeatureLoader = props => {
  const { currentFeatureID, setCurrentFeature } = useContext(
    CurrentFeatureContext
  );

  const { data, error, loading } = useRouteFeature(currentFeatureID);

  // TODO handle error & loading somehow? Probably more setStates
  setCurrentFeature(data);

  return <>{props.children}</>;
};

export default CurrentFeatureLoader;
