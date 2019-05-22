import Button from "@material-ui/core/Button";
import * as React from "react";

const SignInButton: React.SFC<{ onClick: () => void }> = props => {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ textTransform: "capitalize" }}
      onClick={props.onClick}
    >
      Sign in
    </Button>
  );
};

export default SignInButton;
