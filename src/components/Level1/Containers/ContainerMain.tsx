import Container from "@material-ui/core/Container"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, ReactNode } from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
    },
  })
)

export const ContainerMain: FC<ReactNode> = ({ children }) => {
  const classes = useStyles()

  return (
    <Container maxWidth="xs" className={classes.container}>
      {children}
    </Container>
  )
}
