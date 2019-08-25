const gridPosition = ({ width, height, cols, rows }) => {
  const padding = (width * 0.10) 
  const adjWidth = width - (padding * 2)
  const adjHeight = height - (padding * 2)

  const colSize = (adjWidth / cols);
  const rowSize = (adjHeight / rows);

  return {
    x(col) {
      return (col * colSize) + padding;
    },

    y(row) {
      return (row * rowSize) + padding;
    }
  };
};

export default gridPosition;
