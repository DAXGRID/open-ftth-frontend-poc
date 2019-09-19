import React, { createContext, useState } from "react";
const CurrentFeatureContext = createContext();
export default CurrentFeatureContext;

// TODO rename to be higher level, since we're basically encapsulating the whole map and features now

export const CurrentFeatureProvider = props => {
  const [map, setMap] = useState();
  const [currentFeatureID, setCurrentFeatureID] = useState({id: null, type: null});
  const [currentFeature, setCurrentFeature] = useState();
  const [currentFeatureError, setCurrentFeatureError] = useState();
  const [currentFeatureLoading, setCurrentFeatureLoading] = useState();
  const [highlightedFeature, setHighlightedFeature] = useState();
  const [breakoutToSplicePoint, setBreakoutToSplicePoint] = useState();

  return (
    <CurrentFeatureContext.Provider
      value={{
        map,
        setMap,
        currentFeatureID,
        setCurrentFeatureID,
        currentFeature,
        setCurrentFeature,
        currentFeatureError,
        setCurrentFeatureError,
        currentFeatureLoading,
        setCurrentFeatureLoading,
        highlightedFeature,
        setHighlightedFeature,
        breakoutToSplicePoint,
        setBreakoutToSplicePoint
      }}
    >
      {props.children}
    </CurrentFeatureContext.Provider>
  );
};
