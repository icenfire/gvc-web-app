import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Typography from "@material-ui/core/Typography"
import React from "react"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface Props {
  signInPage: boolean
  check: boolean
  handleChange: any
}

function MyCheckBox(props: Props) {
  const classes = useStyles()

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.check}
          onChange={props.handleChange}
          value="checked"
          color="primary"
        />
      }
      label={
        <Typography color="primary" variant="caption">
          {props.signInPage ? "Remember me" : "I consent to"}
        </Typography>
      }
    />
  )
}

export default MyCheckBox
