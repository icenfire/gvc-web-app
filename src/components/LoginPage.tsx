import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { Fragment } from "react"

import Authentication from "../auth/Authentication"
import { auth, db } from "../firebase"
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

  const signUpOnClickTemp = () => {
    console.log("check")
    db.collection("members")
      .add({
        email: values.email,
        name: values.name,
        dob: values.dob
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id)
        db.collection("members")
          .get()
          .then(querySnapshot =>
            querySnapshot.forEach(doc => console.log(doc.id, doc.data()))
          )
      })
      .catch(error => console.error("Error adding document: ", error))
  }

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
    <Fragment>
      <EmailTextField onChange={handleChange("email")} />
      <div />
      <PasswordTextField onChange={handleChange("pw")} />
      <div />
      <NameTextField onChange={handleChange("name")} />
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
      <SignUpButton onClick={signUpOnClick} />
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
