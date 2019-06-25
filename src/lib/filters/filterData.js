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

  return features.map((feature, index) => {
    const geojsonFeature = {
      id: index,
      type: "Feature",
      geometry: {
        type: feature.geometry.type,
        coordinates: JSON.parse(feature.geometry.coordinates)
      },
      properties: {
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

  return features.map((feature, index) => {
    const geojsonFeature = {
      id: index,
      type: "Feature",
      geometry: {
        type: feature.geometry.type,
        coordinates: JSON.parse(feature.geometry.coordinates)
      },
      properties: {
        pam: "true",
        nodeKind: feature.nodeKind,
        nodeFunctionKind: feature.nodeFunctionKind,
        icon: icons[feature.nodeKind],
        ...styles
      }
    };
    return geojsonFeature;
  });
};
