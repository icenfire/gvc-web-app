import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import Grid from "@material-ui/core/Grid"
import InputAdornment from "@material-ui/core/InputAdornment"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField, { TextFieldProps } from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import CalendarToday from "@material-ui/icons/CalendarToday"
import Email from "@material-ui/icons/Email"
import Lock from "@material-ui/icons/Lock"
import Person from "@material-ui/icons/Person"
import { DatePicker } from "@material-ui/pickers"
import { Field, FieldAttributes, Form, Formik, FormikHelpers, useField, useFormikContext } from "formik"
import React, { FC } from "react"
import { useDispatch } from "react-redux"
import * as yup from "yup"

import Logo from "../../images/Logo.svg"
import { signIn, signUp } from "../../store/actions/authActions"
import ChangeSignInUp from "../Level1/Buttons/ChangeSignInUp"
import TermsAndConditionsDialog from "../Level1/Dialogs/TermsAndConditionsDialog"
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
  })
)

interface IValues {
  email: string
  pw: string
  name: string
  dob: Date | null
  rememberMe: boolean
  agreeTAndC: boolean
  signInPage: boolean
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
  const [field, meta] = useField<{}>(props)
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

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  pw: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  // rememberMe: yup.boolean().when("signInPage", {
  //   is: true,
  //   then: yup.boolean().required(),
  // }),
  name: yup.string().when("signInPage", {
    is: false,
    then: yup.string().required("Name is required"),
  }),
  dob: yup
    .date()
    .nullable()
    .when("signInPage", {
      is: false,
      then: yup
        .date()
        .nullable()
        .required("Date of Birth is required"),
    }),
  agreeTAndC: yup.boolean().when("signInPage", {
    is: false,
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
  // const [signInPage, setSignInPage] = useState(true)
  const classes = useStyles()
  const dispatch = useDispatch()

  const initialValues: IValues = {
    email: "",
    pw: "",
    name: "",
    dob: null,
    rememberMe: false,
    agreeTAndC: false,
    signInPage: true,
  }

  const onSubmit = (
    values: IValues,
    { setSubmitting }: FormikHelpers<IValues>
  ) => {
    const { email, pw, name, dob, rememberMe, agreeTAndC, signInPage } = values
    if (signInPage) {
      console.log("Remember me: " + values.rememberMe)
      dispatch(signIn({ email, pw, rememberMe, setSubmitting }))
    } else {
      dispatch(
        signUp({
          email,
          pw,
          name,
          dob,
          agreeTAndC,
          setSubmitting,
        })
      )
    }
  }

  return (
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
              <Grid container spacing={2} alignItems="center" justify="center">
                <Grid item xs={12}>
                  <MyTextField
                    label="Email Address"
                    placeholder="johnsmith@gmail.com"
                    name="email"
                    icon={<Email />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyTextField
                    label="Password"
                    placeholder="Password"
                    name="pw"
                    type="password"
                    autoComplete="current-password"
                    icon={<Lock />}
                  />
                </Grid>

                {!values.signInPage && (
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
                  {values.signInPage ? (
                    <MyCheckBox
                      name="rememberMe"
                      label="Remember me"
                      type="checkbox"
                    />
                  ) : (
                    <MyCheckBox
                      name="agreeTAndC"
                      label="I consent to"
                      type="checkbox"
                    />
                  )}
                </Grid>
                <Grid item>
                  {values.signInPage ? (
                    <MyLink
                      to="/ForgotPassword"
                      color="inherit"
                      variant="caption"
                    >
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
                    disabled={isSubmitting}
                    type="submit"
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
              onClick={() => setFieldValue("signInPage", !values.signInPage)}
            />
          </AppBar>
        </Form>
      )}
    </Formik>
  )
}
