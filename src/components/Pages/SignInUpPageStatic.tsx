import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { useState } from "react"
import { useDispatch } from "react-redux"

import Authentication from "../../auth/Authentication"
import { auth, db } from "../../firebase"
import Logo from "../../images/Logo.svg"
import { signIn, signUp } from "../../store/actions/authActions"
import { ISignUp } from "../../types"
import ChangeSignInUp from "../Level1/Buttons/ChangeSignInUp"
import { DateOfBirthDatePicker } from "../Level1/DatePickers/DateOfBirthDatePicker"
import TermsAndConditionsDialog from "../Level1/Dialogs/TermsAndConditionsDialog"
import MyLink from "../Level1/Links/MyLink"
import MyCheckBox from "../Level1/SelectionControls/MyCheckbox"
import EmailTextField from "../Level1/TextFields/EmailTextField"
import NameTextField from "../Level1/TextFields/NameTextField"
import PasswordTextField from "../Level1/TextFields/PasswordTextField"
import { ContainerMain } from "./../Level1/Containers/ContainerMain"

// import Container from "@material-ui/core/Container"
// import { updateStyle } from "../../store/actions/styleActions"
// import DateOfBirthTextField from "../Level1/TextFields/DateOfBirthTextField"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#616161",

      minHeight: "100%",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    grid: {
      flex: 1,
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
      paddingBottom: theme.spacing(5),
    },

    signInUpButton: {
      textTransform: "none",
      background: theme.palette.primary.light,
    },
    logo: {
      width: theme.spacing(10),
      flex: 1,
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(5),
    },
    footer: {
      bottom: 0,
    },
  })
)

export interface Props {}

export interface State extends ISignUp {
  rememberMe: boolean
  readTAndC: boolean
  signInPage: boolean
}

export default function SignInUpPage(props: Props) {
  const classes = useStyles()
  const [values, setValues] = useState<State>({
    email: "",
    pw: "",
    name: "",
    dob: null,
    rememberMe: false,
    readTAndC: false,
    signInPage: true,
  })

  const dispatch = useDispatch()

  const handleChange = (name: keyof State) => {
    if (name === "dob") {
      return (date: State["dob"]) => setValues({ ...values, [name]: date })
    } else {
      return (event: React.ChangeEvent<HTMLInputElement>) =>
        setValues({ ...values, [name]: event.target.value })
    }
  }

  const changePageOnClick = () =>
    setValues({ ...values, signInPage: !values.signInPage })

  const checkHandleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void =>
    setValues({
      ...values,
      [values.signInPage ? "rememberMe" : "readTAndC"]: event.target.checked,
    })

  const signInUpOnClick = () => {
    if (values.signInPage) {
      console.log("Remember me: " + values.rememberMe)
      dispatch(signIn({ email: values.email, pw: values.pw }))
    } else {
      if (values.readTAndC) {
        dispatch(
          signUp({
            email: values.email,
            pw: values.pw,
            name: values.name,
            dob: values.dob,
          })
        )
      } else {
        console.log("Error: readTAndC=" + values.readTAndC)
      }
    }
  }

  // const signInUpOnClick = () => {
  //   if (values.signInPage) {
  //     console.log("Remember me: " + values.rememberMe)
  //     Authentication.signInWithEmailAndPassword(values.email, values.pw)
  //   } else {
  //     if (values.readTAndC) {
  //       auth()
  //         .createUserWithEmailAndPassword(values.email, values.pw)
  //         .then(() => {
  //           auth().onAuthStateChanged(user => {
  //             if (user) {
  //               db.collection("members").add({
  //                 userID: user.uid,
  //                 name: values.name,
  //                 dob: values.dob,
  //               })
  //             }
  //           })
  //         })
  //         .then(() => {
  //           console.log("Success!: readTAndC=" + values.readTAndC)
  //         })
  //         .catch(error => console.error("Error signing up: ", error))
  //     } else {
  //       console.log("Error: readTAndC=" + values.readTAndC)
  //     }
  //   }
  // }

  return (
    <div className={classes.root}>
      <img src={Logo} className={classes.logo} alt="GVC Logo" />
      <div className={classes.grid}>
        <ContainerMain>
          <Grid container spacing={2} alignItems="center" justify="center">
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
                  {/* <DateOfBirthTextField onChange={handleChange("dob")} /> */}
                  <DateOfBirthDatePicker
                    dob={values.dob}
                    onChange={handleChange("dob")}
                  />
                </Grid>
              </>
            )}

            <Grid item xs>
              {/* <RememberMeCheckbox /> */}
              <MyCheckBox
                signInPage={values.signInPage}
                check={values.signInPage ? values.rememberMe : values.readTAndC}
                handleChange={checkHandleChange}
              />
            </Grid>
            <Grid item>
              {values.signInPage ? (
                <MyLink to="/ForgotPassword" color="inherit" variant="caption">
                  Forgot Password?
                </MyLink>
              ) : (
                <TermsAndConditionsDialog />
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.signInUpButton}
                variant="contained"
                fullWidth
                onClick={signInUpOnClick}
              >
                <Typography color="textPrimary">
                  {values.signInPage ? "Sign in" : "Sign up"}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </ContainerMain>
      </div>
      <AppBar position="sticky" className={classes.footer}>
        <ChangeSignInUp
          signInPage={values.signInPage}
          onClick={changePageOnClick}
        />
      </AppBar>
    </div>
  )
}
