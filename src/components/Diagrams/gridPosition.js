const gridPosition = ({ width, height, cols, rows }) => {
  const hPadding = (width * 0.025) 
  const vPadding = (height * 0.15)
  const adjWidth = width - (hPadding * 2)
  const adjHeight = height - (vPadding * 2)

  const colSize = (width / (cols-1));
  const rowSize = (height / (rows-1));

  return {
    x(col) {
      return (col * colSize);
    },

    y(row) {
      return (row * rowSize);
    }
  };
};

export default gridPosition;
