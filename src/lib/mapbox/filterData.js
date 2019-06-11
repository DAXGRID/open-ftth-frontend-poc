export const filterFeatureData = (data) => {
  const features = data.routeNodes.concat(data.routeSegments)
  return features.map((feature) => {
    var geojsonFeature = {
      type: 'Feature',
      geometry: {
        type: feature.geometry.type,
        coordinates: JSON.parse(feature.geometry.coordinates)
      },
      properties: {
        pam: 'true',
        nodeKind: feature.nodeKind,
        nodeFunctionKind: feature.nodeFunctionKind,
      }
    }
    return geojsonFeature
  })
}
