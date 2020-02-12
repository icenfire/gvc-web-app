import { InputAdornment, TextField } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Email from "@material-ui/icons/Email"
import * as React from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      //   color: theme.palette.common.black,
    },
  })
)

export default function EmailTextField({ onChange }: any) {
  const classes = useStyles()
  return (
    <TextField
      id="outlined-email-input"
      label="Email Address"
      type="email"
      name="email"
      autoComplete="email"
      fullWidth
      onChange={onChange}
      InputLabelProps={{
        className: classes.input,
      }}
      InputProps={{
        className: classes.input,
        endAdornment: (
          <InputAdornment position="end">
            <Email />
          </InputAdornment>
        ),
      }}
    />
  )
}
