import React from "react";
import ReactDOM from "react-dom";
import client from "./apolloClient";
import { ApolloProvider } from "react-apollo";
import AdminLayout from "layouts/Admin.jsx";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "assets/sass/light-bootstrap-dashboard-pro-react.scss?v=1.2.0";
import "assets/css/demo.css";
import "assets/css/pe-icon-7-stroke.css";
import "./i18n";

ReactDOM.render(
  // Suspense wraps whole app for translation loading.
  <React.Suspense fallback="loading">
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Switch>
          <Route path="/admin" render={props => <AdminLayout {...props} />} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </ApolloProvider>
    </BrowserRouter>
  </React.Suspense>,
  document.getElementById("root")
);
