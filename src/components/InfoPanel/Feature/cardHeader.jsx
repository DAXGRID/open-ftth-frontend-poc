import React from "react";

const cardHeader = (
  feature,
  error,
  loading
) => {
  let title, category;

  if (error) {
    title = "Error Loading Item: ";
    category = error;
  }

  if (loading) {
    title = "";
    category = "Loading...";
  }

  if (feature) {
    const address = feature.locationInfo.accessAddress;
    title = feature.name ? feature.name : feature.id;
    
    category = (
      <dl>
        <dt>ID: </dt>
        <dd>{feature.id}</dd>

        <dt>Kind: </dt>
        {feature.nodeKind && <dd>{feature.nodeKind}</dd>}
        {feature.segmentKind && <dd>{feature.segmentKind}</dd>}

        <dt>Function: </dt>
        {feature.nodeFunctionKind && <dd>{feature.nodeFunctionKind}</dd>}
        {feature.segmentFunctionKind && <dd>{feature.segmentFunctionKind}</dd>}

        {address && (
          <>
            <dt>Address: </dt>
            <dd>
              {address.streetName} {address.houseNumber}
            </dd>
          </>
        )}
      </dl>
    );
  }

  return { title, category };
};

export default cardHeader;
