import React, { createContext, useState, useEffect } from "react";
const CurrentFeatureContext = createContext();
export default CurrentFeatureContext;

export const CurrentFeatureProvider = props => {
  const [currentFeatureID, setCurrentFeatureID] = useState();
  const [currentFeature, setCurrentFeature] = useState();

  return (
    <CurrentFeatureContext.Provider
      value={{
        currentFeatureID,
        setCurrentFeatureID,
        currentFeature,
        setCurrentFeature
      }}
    >
      {props.children}
    </CurrentFeatureContext.Provider>
  );
};
