import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"

import { AppBarMain } from "../Level1/AppBars/AppBarMain"
import { ContainerMain } from "../Level1/Containers/ContainerMain"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface IPAccountPage {}

export interface ISAccountPage {}

export const MyAccountPage: FC<IPAccountPage> = props => {
  const classes = useStyles()
  const [values, setValues] = useState<ISAccountPage>({})

  return (
    <Fragment>
      <AppBarMain title="My Account" />
      <ContainerMain>My Account Page</ContainerMain>
    </Fragment>
  )
}
