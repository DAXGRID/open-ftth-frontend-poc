import React from "react";
import Card from "../../../components/Card/Card.jsx";
import { useStateValue } from "../../../hooks/state.jsx";

function InfoDisplay() {
  const [{ currentFeatureId, features }, dispatch] = useStateValue();

  return (
    <Card
      title="Card Heading"
      category="Card category"
      content={
        <div>
          {`Current Feature Id: ${currentFeatureId}`}
          <p className="category">Header 1</p>
        </div>
      }
    />
  );
}

export default InfoDisplay;
