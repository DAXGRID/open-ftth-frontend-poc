const icons = {
  SINGLE_DWELLING_UNIT: "SingleDwellingUnitActive",
  MULTI_DWELLING_UNIT: "MultiDwellingUnitActive",
  HAND_HOLE: "HandHole",
  CONDUIT_CLOSURE: "ConduitClosure",
  CABINET_SMALL: "CabinetSmall",
  CABINET_BIG: "CabinetBig",
  CENTRAL_OFFICE_SMALL: "CentralOfficeSmall"
} 

export const filterFeatureSegments = data => {
  const features = data.routeSegments;
  const styles = {
    "lineWidth": 2,
    "lineColor": "#111"
  };

  return features.map((feature) => {
    const geojsonFeature = {
      id: feature.id,
      type: "Feature",
      geometry: {
        type: feature.geometry.type,
        coordinates: JSON.parse(feature.geometry.coordinates)
      },
      properties: {
        id: feature.id,
        pam: "true",
        segmentKind: feature.segmentKind,
        ...styles
      }
    };
    return geojsonFeature;
  });
};

export const filterFeatureNodes = data => {
  const features = data.routeNodes;
  const styles = {
    "circleRadius": 3,
    "circleColor": "#111"
  };

  return features.map((feature) => {
    const iconName = icons[feature.nodeKind] ? icons[feature.nodeKind] : null
    const iconHoverName = iconName ? `${iconName.split('Active')[0]}Hover` : null
    const geojsonFeature = {
      id: feature.id,
      type: "Feature",
      geometry: {
        type: feature.geometry.type,
        coordinates: JSON.parse(feature.geometry.coordinates)
      },
      properties: {
        id: feature.id,
        pam: "true",
        nodeKind: feature.nodeKind,
        nodeFunctionKind: feature.nodeFunctionKind,
        icon: iconName,
        // this is not great, clean up icon names later
        iconHover: iconHoverName,
        ...styles
      }
    };
    return geojsonFeature;
  });
};
