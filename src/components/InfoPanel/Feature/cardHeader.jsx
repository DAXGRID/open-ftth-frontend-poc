const cardHeader = (feature, error, loading) => {
  let title, category;

  if (error) {
    title = "Error Loading Item: ";
    category = error;
  }

  if (loading) {
    title = "";
    category = "Loading...";
  }

  if (feature) {
    title = feature.name ? feature.name : feature.id;
    category = "";
  }

  return { title, category };
};

export default cardHeader;
