import { InputAdornment, TextField } from "@material-ui/core"
import Email from "@material-ui/icons/Email"
import * as React from "react"

export default function EmailTextField({ onChange }: any) {
  return (
    <TextField
      id="outlined-email-input"
      label="Email Address"
      type="email"
      name="email"
      autoComplete="email"
      fullWidth
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Email />
          </InputAdornment>
        )
      }}
    />
  )
}
