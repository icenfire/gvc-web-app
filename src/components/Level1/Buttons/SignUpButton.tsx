import Button from "@material-ui/core/Button"
import * as React from "react"

export default function SignUpButton({ onClick }: any) {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ textTransform: "capitalize" }}
      onClick={onClick}
      fullWidth
    >
      Sign up
    </Button>
  )
}
