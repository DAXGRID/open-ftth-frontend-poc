import React from "react";
import Card from "../../../components/Card/Card.jsx";
import CurrentFeatureContext from "../../../contexts/CurrentFeatureContext";

function InfoDisplay({ useCurrentFeature }) {
  return (
    <CurrentFeatureContext.Consumer>
      {({ currentFeature, setCurrentFeature }) => {
        if (currentFeature) {
          const category = `${currentFeature.properties.nodeKind} ${
            currentFeature.properties.nodeFunctionKind
          } ${currentFeature.properties.segmentKind}`;
          
          return (
            <Card
              title={`Current Feature Id: ${currentFeature.id}`}
              category={category}
              content={
                <div>
                  <p className="category">Header 1</p>
                </div>
              }
            />
          );
        }
      }}
    </CurrentFeatureContext.Consumer>
  );
}

export default InfoDisplay;
