import React from "react";
import FeatureContext from "hooks/FeatureContext";
import MapboxDisplay from "./MapboxDisplay";

const RouteNetworkMap = ({ projectID }) => {
  const { features } = React.useContext(FeatureContext);
  const longitude = 9.639;
  const latitude = 55.7473;
  const config = {
    container: "mapbox-map",
    center: [longitude, latitude],
    zoom: 16,
    style: "mapbox://styles/tamimitchell/cjx2ss4or057d1cnqj9j62jwl/"
  };

  const uneditableFeatures = () => {
    if (!projectID) {
      return features;
    } else {
      return [];
    }
  };

  const editableFeatures = () => {
    if (projectID) {
      return features;
    } else {
      return [];
    }
  };

  return <MapboxDisplay config={config} uneditableFeatures={uneditableFeatures()} editableFeatures={editableFeatures()} />;
};

export default RouteNetworkMap;
