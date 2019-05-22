import Button from "@material-ui/core/Button";
import * as React from "react";

export default function AlreadyHaveAnAccount() {
  return (
    <Button
      variant="contained"
      color="secondary"
      style={{ textTransform: "capitalize" }}
    >
      Already have an account? Sign in
    </Button>
  );
}
