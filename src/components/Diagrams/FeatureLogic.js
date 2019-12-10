export const canSelectAdditional = (selectedFeatures, feature) => {
  const prevFeature = selectedFeatures[0];
  const features = [...selectedFeatures, feature];

  switch (features.length) {
    case 1:
      return true;
    case 2: {
      if (isSameFeature(prevFeature, feature)) return false;
      if (canConnectInnerConduits(features)) return true;

      if (
        (isInnerConduit(feature) && isCable(prevFeature)) ||
        (isInnerConduit(prevFeature) && isCable(feature))
      ) {
        return true;
      }

      if (
        (isOuterConduit(feature) && isClosure(prevFeature)) ||
        (isOuterConduit(prevFeature) && isClosure(feature))
      ) {
        return true;
      }
      break;
    }
    case 3:
      return canRouteCableThroughConduits(features);
    default:
      return false;
  }
};

export const canConnectInnerConduits = features => {
  return (
    features.length === 2 && isConduit(features[0]) && isConduit(features[1])
  );
};

export const canAddToClosure = features => {
  return (
    (features.length === 2 &&
      isOuterConduit(features[0]) &&
      isClosure(features[1])) ||
    (isOuterConduit(features[1]) && isClosure(features[0]))
  );
};

export const canCutOuterConduit = features => {
  return features.length === 1 && isOuterConduit(features[0]);
};

export const canCutInnerConduit = features => {
  return features.length === 1 && isInnerConduit(features[0]);
};

export const canRouteCableThroughConduits = features => {
  return (
    features.length === 3 &&
    isCable(features[0]) &&
    isConduit(features[1]) &&
    isConduit(features[2])
  );
};

export const isConduit = feature => {
  return isOuterConduit(feature) || isInnerConduit(feature);
};

export const isOuterConduit = feature => {
  return (
    feature &&
    (feature.properties.featureType.toLowerCase().includes("multiconduit") ||
      feature.properties.featureType.toLowerCase().includes("outerconduit"))
  );
};

export const isInnerConduit = feature => {
  return (
    feature &&
    feature.properties.featureType.toLowerCase().includes("innerconduit")
  );
};

export const isCable = feature => {
  return (
    feature && feature.properties.featureType.toLowerCase().includes("cable")
  );
};

export const isClosure = feature => {
  return (
    feature &&
    (feature.properties.featureType.toLowerCase().includes("closure") ||
      feature.properties.featureType.toLowerCase().includes("well")) &&
    !feature.properties.featureType.toLowerCase().includes("cable")
  );
};

const isSameFeature = (feature1, feature2) => {
  return feature1.properties.refId === feature2.properties.refId;
};
