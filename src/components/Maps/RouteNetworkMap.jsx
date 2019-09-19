import React from "react";
import FeatureContext from "hooks/FeatureContext";
import MapboxDisplay from "./MapboxDisplay"

const RouteNetworkMap = () => {
  const { features } = React.useContext(FeatureContext);
  const longitude = 9.639;
  const latitude = 55.7473;
  const config = {
    container: "mapbox-map",
    center: [longitude, latitude],
    zoom: 16,
    style: "mapbox://styles/tamimitchell/cjx2ss4or057d1cnqj9j62jwl/"
  };

  return <MapboxDisplay config={config} uneditableFeatures={features} />
}

export default RouteNetworkMap;