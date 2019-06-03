import { InputAdornment, TextField } from "@material-ui/core"
import Person from "@material-ui/icons/Person"
import * as React from "react"

export default function NameTextField({ onChange }: any) {
  return (
    <TextField
      id="standard-name-input"
      label="Name"
      margin="normal"
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Person />
          </InputAdornment>
        )
      }}
    />
  )
}
