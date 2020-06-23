import Container from '@material-ui/core/Container'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { FC, ReactNode, ReactNodeArray, ReactElement } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%'
    }
  })
)

interface IPContainerMain {
  children: ReactElement | string | ReactNodeArray
  // children: ReactNode
}

export const ContainerMain: FC<IPContainerMain> = ({ children }) => {
  const classes = useStyles()

  return (
    <Container maxWidth="xs" className={classes.container}>
      {children}
    </Container>
  )
}
