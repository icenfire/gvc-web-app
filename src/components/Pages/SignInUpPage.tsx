import Collapse from "@material-ui/core/Collapse"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"

import Authentication from "../../auth/Authentication"
import { auth, db } from "../../firebase"
import ChangeSignInUp from "../Level1/Buttons/ChangeSignInUp"
import TermsAndConditionsDialog from "../Level1/Dialogs/TermsAndConditionsDialog"
import MyLink from "../Level1/Links/MyLink"
import RememberMeCheckbox from "../Level1/SelectionControls/RememberMeCheckbox"
import DateOfBirthTextField from "../Level1/TextFields/DateOfBirthTextField"
import EmailTextField from "../Level1/TextFields/EmailTextField"
import NameTextField from "../Level1/TextFields/NameTextField"
import PasswordTextField from "../Level1/TextFields/PasswordTextField"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      width: "100%",
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
      margin: 0
    },
    button: { textTransform: "capitalize" },
    collapse: {
      width: "100%"
    }
  })
)

export interface Props {}

export interface State {
  email: string
  pw: string
  name: string
  dob: string
  rememberMe: boolean
  signInPage: boolean
}

function SignInUpPage(props: Props) {
  const classes = useStyles()
  const [values, setValues] = React.useState<State>({
    email: "",
    pw: "",
    name: "",
    dob: "",
    rememberMe: false,
    signInPage: true
  })

  const handleChange = (name: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setValues({ ...values, [name]: event.target.value })

  const changePageOnClick = () =>
    setValues({ ...values, signInPage: !values.signInPage })

  const signInUpOnClick = () => {
    values.signInPage
      ? Authentication.signInWithEmailAndPassword(values.email, values.pw)
      : auth()
          .createUserWithEmailAndPassword(values.email, values.pw)
          .then(() => {
            auth().onAuthStateChanged(user => {
              if (user) {
                db.collection("members").add({
                  userID: user.uid,
                  name: values.name,
                  dob: values.dob
                })
              }
            })
          })
          .then(() => {})
          .catch(error => console.error("Error signing up: ", error))
  }

  return (
    <>
      <Grid container spacing={2} alignItems="center" className={classes.grid}>
        <Grid item xs={12}>
          <EmailTextField onChange={handleChange("email")} />
        </Grid>
        <Grid item xs={12}>
          <PasswordTextField onChange={handleChange("pw")} />
        </Grid>
      </Grid>
      <Collapse
        className={classes.collapse}
        in={!values.signInPage}
        timeout="auto"
        unmountOnExit
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          className={classes.grid}
        >
          <Grid item xs={12}>
            <NameTextField onChange={handleChange("name")} />
          </Grid>
          <Grid item xs={12}>
            <DateOfBirthTextField onChange={handleChange("dob")} />
          </Grid>
        </Grid>
      </Collapse>
      <Collapse
        className={classes.collapse}
        in={values.signInPage}
        timeout="auto"
        unmountOnExit
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          className={classes.grid}
        >
          <Grid item xs>
            <RememberMeCheckbox />
          </Grid>
          <Grid item>
            <MyLink to="/ForgotPassword" color="inherit" variant="caption">
              Forgot Password?
            </MyLink>
          </Grid>
        </Grid>
      </Collapse>
      <Grid container spacing={2} alignItems="center" className={classes.grid}>
        <Grid item xs={12}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            fullWidth
            onClick={signInUpOnClick}
          >
            <Typography color="textPrimary">
              {values.signInPage ? "Sign In" : "Sign Up"}
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Collapse
        className={classes.collapse}
        in={!values.signInPage}
        timeout="auto"
        unmountOnExit
      >
        <TermsAndConditionsDialog />
      </Collapse>
      {!values.signInPage && <TermsAndConditionsDialog />}
      <ChangeSignInUp
        signInPage={values.signInPage}
        onClick={changePageOnClick}
      />
    </>
  )
}

export default SignInUpPage
