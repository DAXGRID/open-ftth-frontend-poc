export function createFeatures(features) {
  return {
    type: 'CREATE_FEATURES',
    features
  }
}

export function deleteFeatures(features) {
  return {
    type: 'DELETE_FEATURES',
    features
  }
}
