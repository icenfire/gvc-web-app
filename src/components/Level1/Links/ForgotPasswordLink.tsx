import * as React from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

const ForgotPassword = (props: any) => (
  <Link to="/ForgotPassword" style={{ textDecoration: "none" }} {...props} />
);

export default function ForgotPasswordLink() {
  return <Typography component={ForgotPassword}>Forgot Password?</Typography>;
}
