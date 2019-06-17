import { getFeaturesFromCoords } from "./getUtils.js";

export const editableFeature = (feature, permissions) => {
  if (!permissions.editableFeatureTypes) return;

  const physicalType = feature.properties.physicalType;
  return permissions.editableFeatureTypes.includes(physicalType);
};

export const userAllowedToAddFeatureHere = (state, permissions, coords) => {
  if (!permissions) return true;

  const allowableFeatureLayers = Object.values(permissions);
  const allowableFeatures = Object.keys(permissions);

  const existingFeatures = getFeaturesFromCoords({
    map: state.map,
    coords: coords,
    layers: allowableFeatureLayers
  });
  if (!existingFeatures) {
    window.alert(`Can only start on existing ${allowableFeatures.toString()}.`);
  } else {
    return true;
  }
};
