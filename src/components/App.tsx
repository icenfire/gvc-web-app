import { CssBaseline } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"

import { PrivateRoute } from "../auth/PrivateRoute"
import { AppState } from "../store/reducers/rootReducer"
import LeaderDatePage from "./Pages/LeaderDatePage"
import { LeaderFormPage } from "./Pages/LeaderFormPage"
import { Playground } from "./Pages/Playground"
import SignInUpPage from "./Pages/SignInUpPage"
import SignInUpPageStatic from "./Pages/SignInUpPageStatic"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default,
      // height: "100%",
      padding: 0,
      margin: 0,
    },
  })
)

export default function App() {
  const styles = useSelector((state: { styles: any }) => state.styles)
  const classes = useStyles(styles)

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <CssBaseline />
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <ul>
                <li>
                  <Link to="/public">Public Page</Link>
                </li>
                <li>
                  <Link to="/private">Private Page</Link>
                </li>
              </ul>
            )}
          />
          <Route path="/public" component={Playground} />
          <Route path="/signinup" component={SignInUpPageStatic} />
          <PrivateRoute
            path="/private"
            component={LeaderFormPage}
            redirectPath="/signinup"
          />
          <PrivateRoute
            path="/myaccount"
            component={() => <div>My Account Page</div>}
            redirectPath="/signinup"
          />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
