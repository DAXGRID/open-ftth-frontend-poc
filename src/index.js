import React from "react";
import ReactDOM from "react-dom";
import client from "./redux/store/apolloClient";
import { ApolloProvider } from "react-apollo-hooks";
import AdminLayout from "layouts/Admin.jsx";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "assets/sass/light-bootstrap-dashboard-pro-react.scss?v=1.2.0";
import "assets/css/demo.css";
import "assets/css/pe-icon-7-stroke.css";
import "./i18n";

ReactDOM.render(
  // Suspense wraps whole app for translation loading.
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
