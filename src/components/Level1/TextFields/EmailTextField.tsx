import { InputAdornment, TextField } from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import * as React from "react";

export default function EmailTextField() {
  return (
    <TextField
      id="outlined-email-input"
      label="Email Address"
      className="email"
      type="email"
      name="email"
      autoComplete="email"
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Email />
          </InputAdornment>
        )
      }}
    />
  );
}
