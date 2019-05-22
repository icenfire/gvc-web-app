import * as React from "react";
import { Route, Redirect } from "react-router-dom";

import Authentication from "./Authentication";

export default function PrivateRoute({
  component: Component,
  ...rest
}: {
  component: any;
  [key: string]: any;
}) {
  return (
    <Route
      {...rest}
      render={props =>
        Authentication.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
