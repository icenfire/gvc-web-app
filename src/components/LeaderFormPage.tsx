import * as React from "react";
import PapersFull from "./Level2/Cards/PapersFull";
// import CardsFull from "./Level2/Cards/CardsFull";
import SignOutButton from "./Level1/Buttons/SignOutButton";
import Authentication from "../auth/Authentication";

export default class LoginPage extends React.PureComponent {
  public render() {
    return (
      <div>
        <PapersFull />
        <SignOutButton onClick={signOut} />
      </div>
    );
  }
}

function signOut() {
  Authentication.signOut();
}
