import React from "react";
import CurrentFeatureContext from "../../hooks/CurrentFeatureContext";
import ItemInfo from "./Item";
import InfoMenu from "./Menu";

function InfoDisplay() {
  return (
    <CurrentFeatureContext.Consumer>
      {({ currentFeature, setCurrentFeature }) => {
        if (currentFeature) {
          return <ItemInfo currentFeature={currentFeature} />;
        } else {
          return (
            <InfoMenu
              currentFeature={currentFeature}
              setCurrentFeature={setCurrentFeature}
            />
          );
        }
      }}
    </CurrentFeatureContext.Consumer>
  );
}

export default InfoDisplay;
