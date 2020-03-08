import React, { FC } from "react"
import { useSelector } from "react-redux"
import { Redirect, Route, RouteProps, useLocation } from "react-router"

import { AppState } from "../store/reducers/rootReducer"
import { Paths } from "./../types"

export interface IPPrivateRoute extends RouteProps {
  path: Paths
  redirectPath: string
  redirectIfNotAuthenticated?: boolean
}

export const PrivateRoute: FC<IPPrivateRoute> = ({
  redirectIfNotAuthenticated: redirectIfAuthenticatedIs,
  redirectPath,
  ...rest
}) => {
  const isAuthenticated = !!useSelector<AppState>(
    state => state.firebase.auth.uid
  )

  const requestedPath = useLocation()
  if (redirectIfAuthenticatedIs === undefined) redirectIfAuthenticatedIs = false

  return redirectIfAuthenticatedIs === isAuthenticated ? (
    <Route
      {...rest}
      render={() => (
        <Redirect
          to={{
            pathname: redirectPath,
            state: { from: requestedPath.pathname },
          }}
        />
      )}
      component={undefined}
      children={undefined}
    />
  ) : (
    <Route {...rest} />
  )
}

// import React, { FC } from "react"
// import { Redirect, Route, RouteProps, useLocation } from "react-router"

// // The 'Route' component takes in prop type 'T extends RouteProps' and takes any extra user user props. The extra props below therefore can be safely passed down without type error.
// export interface ProtectedRouteProps extends RouteProps {
//   // This will be a redux-firebase auth state
//   isAuthenticated: boolean
//   // This is the path to get authenticated e.g. "/login"
//   authenticationPath: string
//   // This is the 'saved' path or 'will be saved' path on (needs to be replaced with a redux state) that the user originally wanted to go to be redirected after sign in
//   redirectPathOnAuthentication: string
//   // This will be replaced with a redux action to set the 'redirectPathOnAuthentication' redux state
//   setRedirectPathOnAuthentication: (path: string) => void
// }

// export const ProtectedRoute: FC<ProtectedRouteProps> = props => {
//   // Stage 1. We will get the current requested private path and the already saved private path in redux state to be compared later at Stage 3.
//   // 'currentLocation' is the private path the user currently 'WANTS' to go to e.g. '/profilepage'
//   const currentLocation = useLocation()
//   // 'redirectPath' is the path this run of ProtectedRoute 'WILL' end up rendering. It is first assigned to be the saved private path in redux
//   let redirectPath = props.redirectPathOnAuthentication

//   // Stage 2.
//   // If the user isn't authenticated, then...
//   if (!props.isAuthenticated) {
//     // ...we dispatch an action overwriting the redux state with the 'currentLocation', the private route which the user presently wishes to go to
//     props.setRedirectPathOnAuthentication(currentLocation.pathname)
//     // ...then change the 'redirectPath' to be the login page
//     redirectPath = props.authenticationPath
//   }

//   // Stage 3. render
//   // If the path it 'WILL' go is not the same as the path the user 'WANTS' to go, this means one of two cases: either the user is not authenticated, or the
//   if (redirectPath !== currentLocation.pathname) {
//     const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />
//     return <Route {...props} component={renderComponent} render={undefined} />
//     // See documentation for rendering methods: component vs render vs children https://reacttraining.com/react-router/web/api/Route
//     // return <Route {...props} component={renderComponent} render={undefined} />
//   } else {
//     return <Route {...props} />
//   }
// }
