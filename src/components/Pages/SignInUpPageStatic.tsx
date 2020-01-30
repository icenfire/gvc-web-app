import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import React, { Fragment } from "react"

import Authentication from "../../auth/Authentication"
import { auth, db } from "../../firebase"
import Logo from "../../images/Logo.svg"
import ChangeSignInUp from "../Level1/Buttons/ChangeSignInUp"
import { DateOfBirthDatePicker } from "../Level1/DatePickers/DateOfBirthDatePicker"
import TermsAndConditionsDialog from "../Level1/Dialogs/TermsAndConditionsDialog"
import MyLink from "../Level1/Links/MyLink"
import MyCheckBox from "../Level1/SelectionControls/MyCheckbox"
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
    footer: {
      width: "100%",
      marginTop: "auto"
    },
    signInUpButton: {
      textTransform: "none",
      background: theme.palette.primary.light
    },
    logo: {
      width: theme.spacing(20)
      // marginLeft: "auto",
      // marginRight: "auto"
    }
  })
)

export interface Props {}

export interface State {
  email: string
  pw: string
  name: string
  // dob: string
  dob: MaterialUiPickersDate
  rememberMe: boolean
  readTAndC: boolean
  signInPage: boolean
}

export default function SignInUpPage(props: Props) {
  const classes = useStyles()
  const [values, setValues] = React.useState<State>({
    email: "",
    pw: "",
    name: "",
    dob: null,
    rememberMe: false,
    readTAndC: false,
    signInPage: true
  })

  const handleChange = (name: keyof State) => {
    if (name == "dob") {
      return (date: MaterialUiPickersDate) =>
        setValues({ ...values, [name]: date })
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
      [values.signInPage ? "rememberMe" : "readTAndC"]: event.target.checked
    })

  const signInUpOnClick = () => {
    if (values.signInPage) {
      console.log("Remember me: " + values.rememberMe)
      Authentication.signInWithEmailAndPassword(values.email, values.pw)
    } else {
      if (values.readTAndC) {
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
          .then(() => {
            console.log("Success!: readTAndC=" + values.readTAndC)
          })
          .catch(error => console.error("Error signing up: ", error))
      } else {
        console.log("Error: readTAndC=" + values.readTAndC)
      }
    }
  }

  return (
    <>
      <Grid container spacing={2} alignItems="center" className={classes.grid}>
        <Grid item xs={12}>
          <Container className={classes.logo}>
            <img src={Logo} />
          </Container>
        </Grid>
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
      <footer className={classes.footer}>
        <ChangeSignInUp
          signInPage={values.signInPage}
          onClick={changePageOnClick}
        />
      </footer>
    </>
  )
}
