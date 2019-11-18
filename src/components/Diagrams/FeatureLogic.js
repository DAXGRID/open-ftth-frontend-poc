export const isOuterConduit = feature => {
  return (
    feature.properties.featureType.toLowerCase().includes("multiconduit") ||
    feature.properties.featureType.toLowerCase().includes("outerconduit")
  );
};

export const isInnerConduit = feature => {
  return (
    feature &&
    feature.properties.featureType.toLowerCase().includes("innerconduit")
  );
};

export const isCable = feature => {
  return feature.properties.featureType.toLowerCase().includes("cable");
};
