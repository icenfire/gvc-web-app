import { Container, CssBaseline, Typography } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Link, Route } from "react-router-dom"

import PrivateRoute from "../auth/PrivateRoute"
import LeaderDatePage from "./Pages/LeaderDatePage"
import LeaderFormPage from "./Pages/LeaderFormPage"
import { Playground } from "./Pages/Playground"
import SignInUpPage from "./Pages/SignInUpPage"
import SignInUpPageStatic from "./Pages/SignInUpPageStatic"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      // display: "flex",
      // flexDirection: "column",
      // alignItems: "center",
      // padding: 0,
      // // minHeight: "100vh",
      // height: "100vh",
    },
    root: (styles: any) => ({
      background: styles.background
        ? styles.background
        : theme.palette.background.default,
      height: "100%",
      padding: 0,
      margin: 0,
    }),
  })
)

export default function App() {
  const styles = useSelector((state: { styles: any }) => state.styles)
  const classes = useStyles(styles)

  return (
    <div className={classes.root}>
      <BrowserRouter>
        {/* <Container maxWidth="xs" className={classes.container}> */}
        <Fragment>
          <CssBaseline />
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>
          <Route path="/public" component={Playground} />
          <Route path="/signinup" component={SignInUpPageStatic} />
          {/* <Route path="/signinup" component={SignInUpPage} /> */}
          <PrivateRoute path="/protected" component={LeaderFormPage} />
        </Fragment>
        {/* </Container> */}
      </BrowserRouter>
    </div>
  )
}
