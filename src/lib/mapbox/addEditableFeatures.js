import setupDraw from "./draw";

const addEditableFeatures = ({ map, editableFeatures }) => {
  if (!map || !editableFeatures || !editableFeatures.segments || !editableFeatures.nodes) return;

  const draw = setupDraw(map, editableFeatures);

  editableFeatures.segments.map(feature => draw.add(feature));
  editableFeatures.nodes.map(feature => draw.add(feature));
};

export default addEditableFeatures;
