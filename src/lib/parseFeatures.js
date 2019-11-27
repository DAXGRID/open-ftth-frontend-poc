const icons = {
  SINGLE_DWELLING_UNIT: "SingleDwellingUnitActive",
  MULTI_DWELLING_UNIT: "MultiDwellingUnitActive",
  HAND_HOLE: "HandHole",
  CONDUIT_CLOSURE: "ConduitClosure",
  CABINET_SMALL: "CabinetSmall",
  CABINET_BIG: "CabinetBig",
  CENTRAL_OFFICE_SMALL: "CentralOfficeSmall"
};

export const filterFeatureSegments = data => {
  const features = data.routeSegments;
  const styles = {
    lineWidth: 2,
    lineColor: "#111"
  };

  return features.map(feature => {
    let name;
    if (feature.relatedConduits && feature.relatedConduits.length > 0) {
      name = feature.relatedConduits
        .filter(({conduit}) => {
          return !!conduit.assetInfo;
        })
        .map(({conduit}) => {
          return conduit.assetInfo.model.name;
        })
        .join("\n");
    } else {
      name = "";
    }

    const geojsonFeature = {
      id: feature.id,
      type: "Feature",
      geometry: {
        type: feature.geometry.type,
        coordinates: JSON.parse(feature.geometry.coordinates)
      },
      properties: {
        id: feature.id,
        name,
        pam: "true",
        dataType: "route_segment",
        segmentKind: feature.segmentKind,
        // canBeCutAtNode: feature.canBeCutAtNode,
        // canBeAttachedToConduitClosure: feature.canBeAttachedToConduitClosure,
        ...styles
      }
    };
    return geojsonFeature;
  });
};

export const filterFeatureNodes = data => {
  const features = data.routeNodes;
  const styles = {
    circleRadius: 3,
    circleColor: "#111"
  };

  return features.map(feature => {
    const iconName = icons[feature.nodeKind]
      ? icons[feature.nodeKind]
      : "dot-11";
    const iconHoverName = icons[feature.nodeKind]
      ? `${iconName.split("Active")[0]}Hover`
      : "border-dot-13";
    const geojsonFeature = {
      id: feature.id,
      type: "Feature",
      geometry: {
        type: feature.geometry.type,
        coordinates: JSON.parse(feature.geometry.coordinates)
      },
      properties: {
        id: feature.id,
        name: feature.name,
        pam: "true",
        nodeKind: feature.nodeKind,
        nodeFunctionKind: feature.nodeFunctionKind,
        icon: iconName,
        dataType: "route_node",
        // this is not great, clean up icon names later
        iconHover: iconHoverName,
        ...styles
      }
    };
    return geojsonFeature;
  });
};
