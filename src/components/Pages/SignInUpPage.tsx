import Grid from "@material-ui/core/Grid"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"

import Authentication from "../../auth/Authentication"
import { auth, db } from "../../firebase"
import ChangeSignInOut from "../Level1/Buttons/ChangeSignInOut"
import SignInButton from "../Level1/Buttons/SignInButton"
import SignUpButton from "../Level1/Buttons/SignUpButton"
import TermsAndConditionsDialog from "../Level1/Dialogs/TermsAndConditionsDialog"
import MyLink from "../Level1/Links/MyLink"
import RememberMeCheckbox from "../Level1/SelectionControls/RememberMeCheckbox"
import DateOfBirthTextField from "../Level1/TextFields/DateOfBirthTextField"
import EmailTextField from "../Level1/TextFields/EmailTextField"
import NameTextField from "../Level1/TextFields/NameTextField"
import PasswordTextField from "../Level1/TextFields/PasswordTextField"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6)
    },
    bottom: {
      top: "auto",
      bottom: 0
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

  const signUpOnClick = () => {
    auth()
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
        {!values.signInPage && (
          <>
            <Grid item xs={12}>
              <NameTextField onChange={handleChange("name")} />
            </Grid>
            <Grid item xs={12}>
              <DateOfBirthTextField onChange={handleChange("dob")} />
            </Grid>
          </>
        )}
        <Grid item xs>
          <RememberMeCheckbox />
        </Grid>
        <Grid item>
          <MyLink to="/ForgotPassword" color="inherit" variant="caption">
            Forgot Password?
          </MyLink>
        </Grid>
        {values.signInPage ? (
          <Grid item xs={12}>
            <SignInButton
              onClick={() =>
                Authentication.signInWithEmailAndPassword(
                  values.email,
                  values.pw
                )
              }
            />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <SignUpButton onClick={signUpOnClick} />
          </Grid>
        )}
      </Grid>
      <TermsAndConditionsDialog />
      <ChangeSignInOut
        signInPage={values.signInPage}
        onClick={changePageOnClick}
      />
    </>
  )
}

export default SignInUpPage
