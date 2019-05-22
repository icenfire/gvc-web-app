import { CssBaseline } from "@material-ui/core";
import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import PrivateRoute from "../auth/PrivateRoute";
import LeaderDatePage from "./LeaderDatePage";
import LeaderFormPage from "./LeaderFormPage";

import LoginPage from "./LoginPage";

export default () => (
  <>
    <CssBaseline />
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Route path="/public" component={LeaderDatePage} />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/protected" component={LeaderFormPage} />
      </div>
    </Router>
  </>
);

// <div>
//   <CssBaseline />
//   <LoginPage />
//   <LeaderDatePage />
//   <LeaderFormPage />
// </div>
