import RouteNetworkPage from "views/Pages/RouteNetworkPage.jsx";
import EditRouteNetworkPage from "views/Pages/EditRouteNetworkPage.jsx";

var routes = [
  {
    path: "/",
    layout: "/admin",
    name: "Route Network",
    icon: "pe-7s-map-2",
    component: RouteNetworkPage
  },
  {
    collapse: true,
    path: "/projects",
    name: "Projects",
    state: "openMaps",
    icon: "pe-7s-vector",
    views: [
      {
        path: "/projects/1",
        layout: "/admin",
        name: "Project 1",
        mini: "1",
        component: EditRouteNetworkPage
      }
    ]
  }
];
export default routes;
