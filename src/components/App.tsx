import { Container, CssBaseline } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import * as React from "react"
import { BrowserRouter, Link, Route } from "react-router-dom"

import PrivateRoute from "../auth/PrivateRoute"
import LeaderDatePage from "./Pages/LeaderDatePage"
import LeaderFormPage from "./Pages/LeaderFormPage"
import SignInUpPage from "./Pages/SignInUpPage"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 0,
      minHeight: "100vh"
    }
  })
)

export default function App() {
  const classes = useStyles()
  return (
    <BrowserRouter>
      <Container maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Route path="/public" component={LeaderDatePage} />
        <Route path="/signinup" component={SignInUpPage} />
        <PrivateRoute path="/protected" component={LeaderFormPage} />
      </Container>
    </BrowserRouter>
  )
}
