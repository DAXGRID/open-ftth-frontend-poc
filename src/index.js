import React from "react"
import { Provider } from "react-redux"
import configureStore from './redux/store'
import client from './redux/store/apolloClient'

import { ApolloProvider } from 'react-apollo-hooks'

import ReactDOM from "react-dom"
import { HashRouter, Route, Switch, Redirect } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"
import "assets/sass/light-bootstrap-dashboard-pro-react.scss?v=1.2.0"
import "assets/css/demo.css"
import "assets/css/pe-icon-7-stroke.css"

import AdminLayout from "layouts/Admin.jsx"

const store = configureStore()


ReactDOM.render(
  <ApolloProvider client={client}>
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Redirect from="/" to="/admin/route-network" />
          </Switch>
        </HashRouter>
      </Provider>
  </ApolloProvider>,
  document.getElementById("root")
)
