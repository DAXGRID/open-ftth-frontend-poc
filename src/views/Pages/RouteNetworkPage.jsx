import React from "react";
import useRouteFeatures from "../../hooks/useRouteFeatures";
import { filterFeatureSegments, filterFeatureNodes } from "../../lib/filters/filterData";
import RouteNetworkMap from "../../components/Maps/RouteNetworkMap";

function RouteNetworkPage() {
  const { data, error, loading } = useRouteFeatures();

  if (error)
    return (
      <p>
        {error.message}
        {console.log(error)}
      </p>
    );

  if (loading || !data) return <p>Loading...</p>;

  if (data) {
    const features = {
      nodes: filterFeatureNodes(data),
      segments: filterFeatureSegments(data)
    }
    if (features) return <RouteNetworkMap features={features} />;
  }
};

export default RouteNetworkPage;
