import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { AppBarMain } from "components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "components/Level1/Containers/ContainerMain"
import React, { FC, Fragment, useState } from "react"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface IPMyAccountPage {}

export interface ISMyAccountPage {}

export const MyAccountPage: FC<IPMyAccountPage> = props => {
  const classes = useStyles()
  const [values, setValues] = useState<ISMyAccountPage>({})

  return (
    <Fragment>
      <AppBarMain title="My Account" />
      <ContainerMain></ContainerMain>
    </Fragment>
  )
}
