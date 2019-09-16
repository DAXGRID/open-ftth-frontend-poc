import Dashboard from "views/Dashboard.jsx";
import RouteNetworkPage from "views/Pages/RouteNetworkPage.jsx";
import Diagrams from "views/Components/Diagrams.jsx";
import ConduitIcons from "views/Components/ConduitIcons.jsx";
import Buttons from "views/Components/Buttons.jsx";
import GridSystem from "views/Components/GridSystem.jsx";
import Panels from "views/Components/Panels.jsx";
import SweetAlert from "views/Components/SweetAlertPage.jsx";
import Notifications from "views/Components/Notifications.jsx";
import Icons from "views/Components/Icons.jsx";
import Typography from "views/Components/Typography.jsx";
import RegularForms from "views/Forms/RegularForms.jsx";
import ExtendedForms from "views/Forms/ExtendedForms.jsx";
import ValidationForms from "views/Forms/ValidationForms.jsx";
import Wizard from "views/Forms/Wizard/Wizard.jsx";
import RegularTables from "views/Tables/RegularTables.jsx";
import ExtendedTables from "views/Tables/ExtendedTables.jsx";
import ReactTables from "views/Tables/ReactTables.jsx";

var routes = [
  {
    path: "/dashboard",
    layout: "/admin",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    collapse: true,
    path: "/maps",
    name: "Maps",
    state: "openMaps",
    icon: "pe-7s-map-marker",
    views: [
      {
        path: "/route-network",
        layout: "/admin",
        name: "Route Network",
        mini: "RN",
        component: RouteNetworkPage
      }
    ]
  },
  {
    collapse: true,
    path: "/components",
    name: "Components",
    state: "openComponents",
    icon: "pe-7s-plugin",
    views: [
      {
        path: "/diagrams",
        layout: "/admin",
        name: "Diagrams",
        mini: "D",
        component: Diagrams
      },
      {
        path: "/conduit-icons",
        layout: "/admin",
        name: "Conduit Icons",
        mini: "CI",
        component: ConduitIcons
      },
      {
        path: "/buttons",
        layout: "/admin",
        name: "Buttons",
        mini: "B",
        component: Buttons
      },
      {
        path: "/grid-system",
        layout: "/admin",
        name: "Grid System",
        mini: "GS",
        component: GridSystem
      },
      {
        path: "/panels",
        layout: "/admin",
        name: "Panels",
        mini: "P",
        component: Panels
      },
      {
        path: "/sweet-alert",
        layout: "/admin",
        name: "Sweet Alert",
        mini: "SA",
        component: SweetAlert
      },
      {
        path: "/notifications",
        layout: "/admin",
        name: "Notifications",
        mini: "N",
        component: Notifications
      },
      {
        path: "/icons",
        layout: "/admin",
        name: "Icons",
        mini: "I",
        component: Icons
      },
      {
        path: "/typography",
        layout: "/admin",
        name: "Typography",
        mini: "T",
        component: Typography
      }
    ]
  },
  {
    collapse: true,
    path: "/forms",
    name: "Forms",
    state: "openForms",
    icon: "pe-7s-note2",
    views: [
      {
        path: "/regular-forms",
        layout: "/admin",
        name: "Regular Forms",
        mini: "RF",
        component: RegularForms
      },
      {
        path: "/extended-forms",
        layout: "/admin",
        name: "Extended Forms",
        mini: "EF",
        component: ExtendedForms
      },
      {
        path: "/validation-forms",
        layout: "/admin",
        name: "Validation Forms",
        mini: "VF",
        component: ValidationForms
      },
      {
        path: "/wizard",
        layout: "/admin",
        name: "Wizard",
        mini: "W",
        component: Wizard
      }
    ]
  },
  {
    collapse: true,
    path: "/tables",
    name: "Tables",
    state: "openTables",
    icon: "pe-7s-news-paper",
    views: [
      {
        path: "/regular-tables",
        layout: "/admin",
        name: "Regular Tables",
        mini: "RT",
        component: RegularTables
      },
      {
        path: "/extended-tables",
        layout: "/admin",
        name: "Extended Tables",
        mini: "ET",
        component: ExtendedTables
      },
      {
        path: "/react-table",
        layout: "/admin",
        name: "React Table",
        mini: "RT",
        component: ReactTables
      }
    ]
  }
];
export default routes;
