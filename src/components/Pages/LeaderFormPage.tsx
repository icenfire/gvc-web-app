import * as React from "react"

import Authentication from "../../auth/Authentication"
import SignOutButton from "../Level1/Buttons/SignOutButton"
import PapersFull from "../Level2/Cards/PapersFull"

// import CardsFull from "./Level2/Cards/CardsFull";
export default class LoginPage extends React.PureComponent {
  public render() {
    return (
      <>
        <PapersFull />
        <SignOutButton onClick={signOut} />
      </>
    )
  }
}

function signOut() {
  Authentication.signOut()
}
