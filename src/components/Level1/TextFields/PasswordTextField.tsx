import { InputAdornment, TextField } from "@material-ui/core"
import Lock from "@material-ui/icons/Lock"
import * as React from "react"

export default function PasswordTextField({ onChange }: any) {
  return (
    <TextField
      id="standard-password-input"
      label="Password"
      className="password"
      type="password"
      autoComplete="current-password"
      margin="normal"
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Lock />
          </InputAdornment>
        )
      }}
    />
  )
}
