import Container from "@material-ui/core/Container"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
    },
  })
)

export const ContainerMain: React.FC<React.ReactNode> = ({ children }) => {
  const classes = useStyles()

  return (
    <Container
      maxWidth="xs"
      className={classes.container}
      children={children}
    />
  )
}
