import Link from "@material-ui/core/Link"
import * as React from "react"
import { Link as RouterLink } from "react-router-dom"

export default function ForgotPasswordLink() {
  return (
    <Link component={RouterLink} to="/ForgotPassword" color="inherit">
      Forgot Password?
    </Link>
  )
}
