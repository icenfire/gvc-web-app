import Button from "@material-ui/core/Button";
import * as React from "react";

export default function DontHaveAnAccount() {
  return (
    <Button
      variant="contained"
      color="secondary"
      style={{ textTransform: "capitalize" }}
    >
      Don't have an account? Sign up
    </Button>
  );
}
