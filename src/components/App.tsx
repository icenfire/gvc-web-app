import { CssBaseline } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Link, Route, Switch, useHistory, useLocation } from "react-router-dom"

import { PrivateRoute } from "../auth/PrivateRoute"
import { AppState } from "../store/reducers/rootReducer"
import { AppBarMain } from "./Level1/AppBars/AppBarMain"
import { AuthPage } from "./Pages/AuthPage"
import { CalendarPage } from "./Pages/CalendarPage"
import { LeaderFormPage } from "./Pages/LeaderFormPage"
import { MembersPage } from "./Pages/MembersPage"
import { MyAccountPage } from "./Pages/MyAccountPage"
import { Playground } from "./Pages/Playground"
import { PrayersPage } from "./Pages/PrayersPage"
import SignInUpPage from "./Pages/SignInUpPage"

// import LeaderDatePage from "./Pages/LeaderDatePage"
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
  const isAuthenticated = useSelector<AppState, boolean>(
    state => !state.firebase.auth.isEmpty
  )

  const location = useLocation<{ from: string }>()
  const fromOrHome: string = location.state?.from || "/"

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <CssBaseline />
        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              console.log("check")
              return (
                <ul>
                  <li>
                    <Link to="/public">Public Page</Link>
                  </li>
                  <li>
                    <Link to="/private">Private Page</Link>
                  </li>
                </ul>
              )
            }}
          />
          <Route path="/public" component={Playground} />
          <Route path="/playground" component={Playground} />
          <PrivateRoute
            path="/auth"
            redirectConditionMet={isAuthenticated}
            checkFrom
            component={AuthPage}
          />
          <PrivateRoute path="/private" component={MembersPage} />
          <PrivateRoute path="/myaccount" component={MyAccountPage} />
          <PrivateRoute path="/members" component={MembersPage} />
          <PrivateRoute path="/prayers" component={PrayersPage} />
          <PrivateRoute path="/calendar" component={CalendarPage} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
