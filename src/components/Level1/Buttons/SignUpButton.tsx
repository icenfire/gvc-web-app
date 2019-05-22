import Button from "@material-ui/core/Button";
import * as React from "react";

export default function SignUpButton() {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ textTransform: "capitalize" }}
    >
      Sign up
    </Button>
  );
}
