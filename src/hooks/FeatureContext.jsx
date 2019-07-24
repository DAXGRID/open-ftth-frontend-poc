import React, { createContext, useState } from "react";
import useRouteFeatures from "hooks/useRouteFeatures";
import { filterFeatureSegments, filterFeatureNodes } from "lib/parseFeatures";
import { useTranslation } from "react-i18next";
const { t } = useTranslation();

const FeatureContext = createContext();
export default FeatureContext;

export const FeatureProvider = props => {
  const [features, setFeatures] = useState();

  const { data, error, loading } = useRouteFeatures();

  if (loading || !data) return <p>Loading...</p>;

  if (error) {
    console.warn("Error retrieving data:");
    console.warn(error);
    return <p>{t("An error occured while retrieving data")}</p>;
  }

  if (!features) {
    setFeatures({
      nodes: filterFeatureNodes(data),
      segments: filterFeatureSegments(data)
    });

    return;
  }

  return (
    <FeatureContext.Provider value={{ features }}>
      {props.children}
    </FeatureContext.Provider>
  );
};
