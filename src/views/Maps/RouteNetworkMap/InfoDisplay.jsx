import React from "react";
import Card from "../../../components/Card/Card.jsx";
import CurrentFeatureContext from "../../../contexts/CurrentFeatureContext";

function InfoDisplay({useCurrentFeature}) {
  return (
    <CurrentFeatureContext.Consumer>
      {({currentFeature, setCurrentFeature}) => 
        <Card
          title="Card Heading"
          category="Card category"
          content={
            <div>
              {currentFeature &&
                `Current Feature Id: ${currentFeature.id}`
              }
              <p className="category">Header 1</p>
            </div>
          }
        />
      }
    </CurrentFeatureContext.Consumer>
  );
}

export default InfoDisplay;
