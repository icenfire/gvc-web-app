import { InputAdornment, TextField } from "@material-ui/core";
import CalendarToday from "@material-ui/icons/CalendarToday";
import * as React from "react";

export default function DateOfBirthTextField() {
  return (
    <TextField
      id="standard-dob-input"
      label="Date Of Birth"
      className="dob"
      type="date"
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <CalendarToday />
          </InputAdornment>
        )
      }}
    />
  );
}
