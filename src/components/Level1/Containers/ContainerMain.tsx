import Container from "@material-ui/core/Container"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, ReactElement, ReactNode, ReactNodeArray } from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
    },
  })
)

interface IPContainerMain {
  // children: ReactElement | string | ReactNodeArray
  // children: ReactNode
  children: any
}

export const ContainerMain: FC<IPContainerMain> = ({ children }) => {
  const classes = useStyles()

  return (
    <Container maxWidth="xs" className={classes.container}>
      {children}
    </Container>
  )
}
