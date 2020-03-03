import * as React from "react"
import { Redirect, Route } from "react-router-dom"

import Authentication from "./Authentication"

export const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: any
  [key: string]: any
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        Authentication.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signinup",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}
