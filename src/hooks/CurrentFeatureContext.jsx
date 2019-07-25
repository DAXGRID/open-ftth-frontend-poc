import React, { createContext, useState, useEffect } from "react";
const CurrentFeatureContext = createContext();
export default CurrentFeatureContext;

export const CurrentFeatureProvider = props => {
  const [currentFeatureID, setCurrentFeatureID] = useState();
  const [currentFeature, setCurrentFeature] = useState();
  const [currentFeatureError, setCurrentFeatureError] = useState();
  const [currentFeatureLoading, setCurrentFeatureLoading] = useState();

  return (
    <CurrentFeatureContext.Provider
      value={{
        currentFeatureID,
        setCurrentFeatureID,
        currentFeature,
        setCurrentFeature,
        currentFeatureError,
        setCurrentFeatureError,
        currentFeatureLoading,
        setCurrentFeatureLoading
      }}
    >
      {props.children}
    </CurrentFeatureContext.Provider>
  );
};
