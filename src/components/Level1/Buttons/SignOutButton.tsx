import Button from "@material-ui/core/Button"
import * as React from "react"

const SignOutButton: React.SFC<{ onClick: () => void }> = props => {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ textTransform: "capitalize" }}
      onClick={props.onClick}
      fullWidth
    >
      Sign out
    </Button>
  )
}

export default SignOutButton
