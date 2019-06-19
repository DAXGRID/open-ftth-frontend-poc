const infrastructureLayers = map => {
  map.addLayer({
    id: "physical-type-duct",
    type: "line",
    source: "features",
    filter: [
      "all",
      ["==", "$type", "LineString"],
      ["==", "physicalType", "duct"]
    ],
    layout: {
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
      "line-color": "#111",
      "line-width": 2
    }
  });

  map.addLayer({
    id: "physical-type-cabinet",
    type: "circle",
    source: "features",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "physicalType", "cabinet"]
    ],
    paint: {
      "circle-radius": 3,
      "circle-color": "#111"
    }
  });

  map.addLayer({
    id: "single-dwelling-unit",
    type: "symbol",
    source: "features",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "nodeKind", "SINGLE_DWELLING_UNIT"]
    ],
    layout: {
      "icon-allow-overlap": true, 
      "icon-image": "SingleDwellingUnitActive",
    }
  });

  map.addLayer({
    id: "multi-dwelling-unit",
    type: "symbol",
    source: "features",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "nodeKind", "MULTI_DWELLING_UNIT"]
    ],
    layout: {
      "icon-allow-overlap": true, 
      "icon-image": "MultiDwellingUnitActive",
    }
  });

  map.addLayer({
    id: "hand-hole",
    type: "symbol",
    source: "features",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "nodeKind", "HAND_HOLE"]
    ],
    layout: {
      "icon-allow-overlap": true, 
      "icon-image": "HandHole",
    }
  });

  map.addLayer({
    id: "conduit-closure",
    type: "symbol",
    source: "features",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "nodeKind", "CONDUIT_CLOSURE"]
    ],
    layout: {
      "icon-allow-overlap": true, 
      "icon-image": "ConduitClosure",
    }
  });

  map.addLayer({
    id: "cabinet-small",
    type: "symbol",
    source: "features",
    filter: [
      "all",
      ["==", "nodeKind", "CABINET_SMALL"]
    ],
    layout: {
      "icon-allow-overlap": true, 
      "icon-image": "CabinetSmall",
    }
  });

  map.addLayer({
    id: "cabinet-large",
    type: "symbol",
    source: "features",
    filter: [
      "all",
      ["==", "nodeKind", "CABINET_BIG"]
    ],
    layout: {
      "icon-allow-overlap": true, 
      "icon-image": "CabinetBig",
    }
  });

  map.addLayer({
    id: "central-office-small",
    type: "symbol",
    source: "features",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "nodeKind", "CENTRAL_OFFICE_SMALL"]
    ],
    layout: {
      "icon-allow-overlap": true, 
      "icon-image": "CentralOfficeSmall",
    }
  });
};

export default infrastructureLayers;
