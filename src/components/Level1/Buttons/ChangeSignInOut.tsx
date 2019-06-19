import { Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import * as React from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      textTransform: "capitalize",
      borderRadius: 0,
      whiteSpace: "pre-wrap"
    }
  })
)

export default function ChangeSignInOut({ onClick, signInPage }: any) {
  const classes = useStyles()
  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      onClick={onClick}
      fullWidth
    >
      <Typography color="primary" display="inline" variant="body2">
        {signInPage ? "Don't have an account? " : "Already have an account? "}
      </Typography>
      <Typography display="inline" variant="body2">
        {signInPage ? "Sign Up" : "Sign In"}
      </Typography>
    </Button>
  )
}
