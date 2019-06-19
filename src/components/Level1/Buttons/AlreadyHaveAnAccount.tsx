import { Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import * as React from "react"

export default function AlreadyHaveAnAccount({ onClick }: any) {
  return (
    <Button
      variant="contained"
      color="secondary"
      style={{
        textTransform: "capitalize",
        borderRadius: 0,
        whiteSpace: "pre-wrap"
      }}
      onClick={onClick}
      fullWidth
    >
      <Typography color="primary" display="inline" variant="body2">
        {"Already have an account? "}
      </Typography>
      <Typography display="inline" variant="body2">
        Sign In
      </Typography>
    </Button>
  )
}
