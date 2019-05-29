import * as React from "react";
import AlreadyHaveAnAccount from "./Level1/Buttons/AlreadyHaveAnAccount";
import DontHaveAnAccount from "./Level1/Buttons/DontHaveAnAccount";
import SignInButton from "./Level1/Buttons/SignInButton";
import SignUpButton from "./Level1/Buttons/SignUpButton";

import TermsAndConditionsDialog from "./Level1/Dialogs/TermsAndConditionsDialog";

import ForgotPasswordLink from "./Level1/Links/ForgotPasswordLink";
// import ForgotPasswordLink from "~/components/Level1/Links/ForgotPasswordLink";

import RememberMeCheckbox from "./Level1/SelectionControls/RememberMeCheckbox";

import DateOfBirthTextField from "./Level1/TextFields/DateOfBirthTextField";
import EmailTextField from "./Level1/TextFields/EmailTextField";
import NameTextField from "./Level1/TextFields/NameTextField";
import PasswordTextField from "./Level1/TextFields/PasswordTextField";

import Authentication from "../auth/Authentication";

export default class LoginPage extends React.PureComponent {
  render() {
    return (
      <div>
        <EmailTextField />
        <div />
        <PasswordTextField />
        <div />
        <NameTextField />
        <div />
        <DateOfBirthTextField />
        <div />
        <RememberMeCheckbox /> Needs to turn the label colour to primary
        <div />
        <ForgotPasswordLink />
        <div />
        <SignInButton onClick={signIn} />
        <div />
        <SignUpButton />
        <div />
        <DontHaveAnAccount /> Needs to have color control of the button label
        <div />
        <AlreadyHaveAnAccount /> Needs to have color control of the button label
        <div />
        <TermsAndConditionsDialog />
        <div />
      </div>
    );
  }
}

function signIn() {
  const email = document.getElementById("outlined-email-input");
  const pw = document.getElementById("standard-password-input");
  Authentication.signInWithEmailAndPassword(
    (email as HTMLInputElement).value,
    (pw as HTMLInputElement).value
  );
  console.log(
    (email as HTMLInputElement).value,
    (pw as HTMLInputElement).value
  );
}
