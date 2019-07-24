import React from "react";
// import { StateProvider } from "./hooks/state.jsx";

// import { Provider } from "react-redux";
// import configureStore from "./redux/store";
import client from "./redux/store/apolloClient";

import { ApolloProvider } from "react-apollo-hooks";

import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import "./i18n";

import "bootstrap/dist/css/bootstrap.min.css";
import "assets/sass/light-bootstrap-dashboard-pro-react.scss?v=1.2.0";
import "assets/css/demo.css";
import "assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";

// const store = configureStore();

// const initialState = {
//   features: [],
//   currentFeatureId: null
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "changeCurrentFeatureId":
//       return {
//         ...state,
//         currentFeatureId: action.currentFeatureId
//       };

//     default:
//       return state;
//   }
// };

ReactDOM.render(
  <React.Suspense fallback="loading">
    <ApolloProvider client={client}>
      {/* <Provider store={store}> */}
      {/* <StateProvider initialState={initialState} reducer={reducer}> */}
      <HashRouter>
        <Switch>
          <Route path="/admin" render={props => <AdminLayout {...props} />} />
          <Redirect from="/" to="/admin/route-network" />
        </Switch>
      </HashRouter>
      {/* </StateProvider> */}
      {/* </Provider> */}
    </ApolloProvider>
  </React.Suspense>,
  document.getElementById("root")
);
