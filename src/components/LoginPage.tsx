import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { Fragment } from "react"

import Authentication from "../auth/Authentication"
import AlreadyHaveAnAccount from "./Level1/Buttons/AlreadyHaveAnAccount"
import DontHaveAnAccount from "./Level1/Buttons/DontHaveAnAccount"
import SignInButton from "./Level1/Buttons/SignInButton"
import SignUpButton from "./Level1/Buttons/SignUpButton"
import TermsAndConditionsDialog from "./Level1/Dialogs/TermsAndConditionsDialog"
import ForgotPasswordLink from "./Level1/Links/ForgotPasswordLink"
import RememberMeCheckbox from "./Level1/SelectionControls/RememberMeCheckbox"
import DateOfBirthTextField from "./Level1/TextFields/DateOfBirthTextField"
import EmailTextField from "./Level1/TextFields/EmailTextField"
import NameTextField from "./Level1/TextFields/NameTextField"
import PasswordTextField from "./Level1/TextFields/PasswordTextField"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface Props {}

export interface State {
  email: string
  pw: string
  name: string
  dob: string
  rememberMe: boolean
}

function LoginPage(props: Props) {
  const classes = useStyles()
  const [values, setValues] = React.useState<State>({
    email: "",
    pw: "",
    name: "",
    dob: "",
    rememberMe: false
  })

  const handleChange = (name: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setValues({ ...values, [name]: event.target.value })

  return (
    <Fragment>
      <EmailTextField onChange={handleChange("email")} />
      <div />
      <PasswordTextField onChange={handleChange("pw")} />
      <div />
      <NameTextField />
      <div />
      <DateOfBirthTextField onChange={handleChange("dob")} />
      <div />
      <RememberMeCheckbox /> Needs to turn the label colour to primary
      <div />
      <ForgotPasswordLink />
      <div />
      <SignInButton
        onClick={() =>
          Authentication.signInWithEmailAndPassword(values.email, values.pw)
        }
      />
      <div />
      <SignUpButton />
      <div />
      <DontHaveAnAccount /> Needs to have color control of the button label
      <div />
      <AlreadyHaveAnAccount /> Needs to have color control of the button label
      <div />
      <TermsAndConditionsDialog />
      <div />
    </Fragment>
  )
}

export default LoginPage
