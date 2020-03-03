import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import CircularProgress from "@material-ui/core/CircularProgress"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import Grid from "@material-ui/core/Grid"
import InputAdornment from "@material-ui/core/InputAdornment"
import Link from "@material-ui/core/Link"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField, { TextFieldProps } from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import CalendarToday from "@material-ui/icons/CalendarToday"
import Email from "@material-ui/icons/Email"
import Lock from "@material-ui/icons/Lock"
import Person from "@material-ui/icons/Person"
import { DatePicker } from "@material-ui/pickers"
import { Field, FieldAttributes, Form, Formik, FormikHelpers, useField, useFormikContext } from "formik"
import React, { FC, Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import * as yup from "yup"

import Logo from "../../images/Logo.svg"
import { resetPassword, signIn, signUp } from "../../store/actions/authActions"
import { AppState } from "../../store/reducers/rootReducer"
import { ChangeSignInUp } from "../Level1/Buttons/ChangeSignInUp"
import { AlertDialog } from "../Level1/Dialogs/AlertDialog"
import { ResetPasswordDialog } from "../Level1/Dialogs/ResetPasswordDialog"
import { TermsAndConditionsDialog } from "../Level1/Dialogs/TermsAndConditionsDialog"
import MyLink from "../Level1/Links/MyLink"
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
    buttonWrapper: {
      position: "relative",
      padding: 0,
    },
    progress: {
      color: theme.palette.secondary.light,
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -24,
      marginLeft: -24,
      zIndex: 1,
    },
  })
)

interface IValues {
  email: string
  password: string
  name: string
  dob: Date | null
  rememberMe: boolean
  agreeTAndC: boolean
  page: "signIn" | "signUp" | "resetPassword"
  alertResetPassword: boolean
  alertSignUp: boolean
}

const MyTextField: FC<FieldAttributes<{}> &
  TextFieldProps & { icon: JSX.Element }> = ({
  label,
  type,
  placeholder,
  icon,
  ...props
}) => {
  const [field, meta] = useField<{}>(props)
  const errorText = meta.error && meta.touched ? meta.error : ""
  return (
    <TextField
      {...field}
      label={label}
      placeholder={placeholder}
      type={type}
      helperText={errorText}
      error={!!errorText}
      fullWidth
      InputProps={{
        // className: classes.input,
        endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
      }}
    />
  )
}

const MyDatePicker: FC<FieldAttributes<{}> & { label: string } & {
  icon: JSX.Element
}> = ({ label, placeholder, icon, ...props }) => {
  const [field, meta] = useField<{}>(props)
  const { setFieldValue } = useFormikContext()
  const errorText = meta.error && meta.touched ? meta.error : ""

  return (
    <DatePicker
      {...field}
      label={label}
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
      disableFuture
      openTo="year"
      format="dd/MM/yyyy"
      views={["year", "month", "date"]}
      fullWidth
      onChange={val => {
        setFieldValue(field.name, val)
      }}
      InputProps={{
        endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
      }}
    />
  )
}

const MyCheckBox: FC<FieldAttributes<{}> & { label: string }> = ({
  label,
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>({ ...props, type: "checkbox" })
  const errorText = meta.error && meta.touched ? meta.error : ""
  return (
    <FormControl required error={!!errorText} component="fieldset">
      <FormControlLabel
        control={<Checkbox {...field} color="primary" />}
        label={
          <Typography color="primary" variant="caption">
            {label}
          </Typography>
        }
      />
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  )
}

const validationSchema = yup.object<Partial<IValues>>({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup.string().when("page", {
    is: page => page === "signIn" || page === "signUp",
    then: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  }),

  // rememberMe: yup.boolean().when("signInPage", {
  //   is: true,
  //   then: yup.boolean().required(),
  // }),
  name: yup.string().when("page", {
    is: "signUp",
    then: yup.string().required("Name is required"),
  }),
  dob: yup
    .date()
    .nullable()
    .when("page", {
      is: "signUp",
      then: yup
        .date()
        .nullable()
        .required("Date of Birth is required"),
    }),
  agreeTAndC: yup.boolean().when("page", {
    is: "signUp",
    then: yup
      .boolean()
      .required()
      .test({
        name: "readTAndC",
        message: "You must agree with the Terms & Conditions",
        test: (agreeTAndC: boolean) => agreeTAndC,
      }),
  }),
})

export interface Props {}

export default function SignInUpPage(props: Props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const fbFeedback = useSelector<AppState, AppState["auth"]>(
    state => state.auth
  )
  const location = useLocation<{ from: string }>()
  const history = useHistory()

  const initialValues: IValues = {
    email: "",
    password: "",
    name: "",
    dob: null,
    rememberMe: false,
    agreeTAndC: false,
    page: "signIn",
    alertResetPassword: false,
    alertSignUp: false,
  }

  const onSubmit = (
    values: IValues,
    { setSubmitting, setFieldValue }: FormikHelpers<IValues>
  ) => {
    const { email, password, name, dob, rememberMe, agreeTAndC, page } = values

    const openAlertResetPassword = () =>
      setFieldValue("alertResetPassword", true)
    const openAlertSignUp = () => setFieldValue("alertSignUp", true)

    const redirectOnSignIn = () => {
      const { from } = location.state || { from: "/" }
      history.push(from)
      console.log(history)
    }

    switch (page) {
      case "signIn":
        console.log("Remember me: " + values.rememberMe)
        dispatch(
          signIn({
            email,
            password,
            rememberMe,
            setSubmitting,
            redirectOnSignIn,
          })
        )
        break

      case "signUp":
        dispatch(
          signUp({
            email,
            password,
            name,
            dob,
            agreeTAndC,
            setSubmitting,
            openAlert: openAlertSignUp,
          })
        )
        break

      case "resetPassword":
        // TODO: password reset link
        console.log("Send password reset link")
        dispatch(
          resetPassword({
            email,
            setSubmitting,
            openAlert: openAlertResetPassword,
          })
        )
        break
    }
  }

  return (
    <Fragment>
      <Formik<IValues>
        validateOnChange
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, isSubmitting, setFieldValue }) => (
          <Form className={classes.root}>
            <img src={Logo} className={classes.logo} alt="GVC Logo" />
            <div className={classes.grid}>
              <ContainerMain>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={12}>
                    <MyTextField
                      label="Email Address"
                      placeholder="johnsmith@gmail.com"
                      name="email"
                      icon={<Email />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {values.page !== "resetPassword" && (
                      <MyTextField
                        label="Password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        icon={<Lock />}
                      />
                    )}
                  </Grid>

                  {values.page === "signUp" && (
                    <>
                      <Grid item xs={12}>
                        <MyTextField
                          label="Name"
                          placeholder="김철수/John Smith"
                          name="name"
                          icon={<Person />}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MyDatePicker
                          label="Date of Birth"
                          placeholder="01/01/2000"
                          name="dob"
                          icon={<CalendarToday />}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs>
                    {values.page === "signIn" && (
                      <MyCheckBox name="rememberMe" label="Remember me" />
                    )}
                    {values.page === "signUp" && (
                      <MyCheckBox name="agreeTAndC" label="I consent to" />
                    )}
                  </Grid>
                  <Grid item>
                    {values.page === "signIn" && (
                      <Link
                        onClick={() => setFieldValue("page", "resetPassword")}
                        display="block"
                        align="center"
                        variant="caption"
                        color="inherit"
                      >
                        Forgot Password?
                      </Link>
                    )}
                    {values.page === "signUp" && <TermsAndConditionsDialog />}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      required
                      error={
                        values.page === "signIn"
                          ? !!fbFeedback.signInError
                          : values.page === "signUp"
                          ? !!fbFeedback.signUpError
                          : !!fbFeedback.resetPasswordError
                      }
                      component="fieldset"
                      fullWidth
                    >
                      <div className={classes.buttonWrapper}>
                        <Button
                          className={classes.signInUpButton}
                          variant="contained"
                          fullWidth
                          disabled={isSubmitting}
                          type="submit"
                        >
                          <Typography color="textPrimary">
                            {values.page === "signIn" && "Sign in"}
                            {values.page === "signUp" && "Sign up"}
                            {values.page === "resetPassword" &&
                              "Email me reset password link"}
                          </Typography>
                        </Button>
                        {isSubmitting && (
                          <CircularProgress
                            size={48}
                            className={classes.progress}
                          />
                        )}
                      </div>
                      <FormHelperText>
                        {values.page === "signIn" &&
                          fbFeedback.signInError?.message}
                        {values.page === "signUp" &&
                          fbFeedback.signUpError?.message}
                        {values.page === "resetPassword" &&
                          (fbFeedback.resetPasswordError
                            ? fbFeedback.resetPasswordError?.message
                            : fbFeedback.resetPasswordSuccess)}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  {values.page === "resetPassword" && (
                    <Grid item xs>
                      <Link
                        onClick={() => setFieldValue("page", "signIn")}
                        display="block"
                        align="center"
                        variant="caption"
                        color="inherit"
                      >
                        Return to sign in page?
                      </Link>
                    </Grid>
                  )}
                </Grid>
              </ContainerMain>
            </div>
            <AlertDialog
              title="Password reset link sent!"
              content="Password reset link has been sent to your email. Please check your email to reset your password, and then come back to sign in."
              open={values.alertResetPassword}
              handleClose={() => {
                setFieldValue("alertResetPassword", false)
                setFieldValue("page", "signIn")
              }}
            />
            <AlertDialog
              title="Sign up successful!"
              content="Plase now sign in"
              open={values.alertSignUp}
              handleClose={() => {
                setFieldValue("alertSignUp", false)
                setFieldValue("page", "signIn")
              }}
            />
            <AppBar position="sticky" className={classes.footer}>
              <ChangeSignInUp
                page={values.page}
                onClick={() => {
                  values.page !== "signUp"
                    ? setFieldValue("page", "signUp")
                    : setFieldValue("page", "signIn")
                }}
              />
            </AppBar>
          </Form>
        )}
      </Formik>
    </Fragment>
  )
}
