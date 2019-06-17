import defaultLayers from "./default";
import infrastructureLayers from "./infrastructure";

const addUneditableFeatureLayers = map => {
  defaultLayers(map);
  infrastructureLayers(map);
};

export default addUneditableFeatureLayers;
