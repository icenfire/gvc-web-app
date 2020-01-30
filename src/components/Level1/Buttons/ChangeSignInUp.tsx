import { Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import * as React from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      textTransform: "none",
      borderRadius: 0,
      whiteSpace: "pre-wrap",
      background: theme.palette.secondary.main
    },
    signUpIn: {
      color: theme.palette.common.white
    }
  })
)

export default function ChangeSignInUp({ onClick, signInPage }: any) {
  const classes = useStyles()
  return (
    <Button
      variant="contained"
      // color="secondary"
      className={classes.button}
      onClick={onClick}
      fullWidth
    >
      <Typography color="primary" display="inline" variant="body2">
        {signInPage ? "Don't have an account? " : "Already have an account? "}
      </Typography>
      <Typography display="inline" variant="body2" className={classes.signUpIn}>
        {signInPage ? "Sign up" : "Sign in"}
      </Typography>
    </Button>
  )
}
