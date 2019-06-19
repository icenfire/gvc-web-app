import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React from "react"

import Authentication from "../../auth/Authentication"
import { auth, db } from "../../firebase"
import AlreadyHaveAnAccount from "../Level1/Buttons/AlreadyHaveAnAccount"
import ChangeSignInOut from "../Level1/Buttons/ChangeSignInOut"
import DontHaveAnAccount from "../Level1/Buttons/DontHaveAnAccount"
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
      {/* {values.page == "signIn" ? (
        <DontHaveAnAccount
          onClick={changePageOnClick("signUp")}
          className={classes.bottom}
        />
      ) : (
        <AlreadyHaveAnAccount
          onClick={changePageOnClick("signIn")}
          className={classes.bottom}
        />
      )} */}
    </>
  )
}

export default SignInUpPage

// <MyLink
//         to="/SignUp"
//         color="inherit"
//         style={{ width: "100%" }}
//         underline="none" //TODO: Need to take style out
//       >
//         <Box
//           bgcolor="secondary.main"
//           p={2}
//           display="flex"
//           justifyContent="center"
//           style={{ whiteSpace: "pre-wrap" }} // TODO: Need to take style out. Without this, white spaces at the end of the first typography is undesirably removed
//         >
//           <Typography color="primary" display="inline" variant="body2">
//             {"Don't have an account? "}
//           </Typography>
//           <Typography display="inline" variant="body2">
//             Sign up
//           </Typography>
//         </Box>
//       </MyLink>
