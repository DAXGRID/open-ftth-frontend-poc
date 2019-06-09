export const editableFeature = (feature, user) => {
  const physicalType = feature.properties.physicalType
  return user.editablePhysicalTypes.includes(physicalType)
}
