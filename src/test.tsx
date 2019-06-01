import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { Fragment } from "react"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface Props {}

export interface State {}

function ComponentName(props: Props) {
  const classes = useStyles()
  const [values, setValues] = React.useState<State>({})

  return <Fragment />
}

export default ComponentName
