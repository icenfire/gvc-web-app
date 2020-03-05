import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"

import { AppBarMain } from "../Level1/AppBars/AppBarMain"
import { ContainerMain } from "../Level1/Containers/ContainerMain"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface IPLeaderDatePage {}

export interface ISLeaderDatePage {}

export const LeaderDatePage: FC<IPLeaderDatePage> = props => {
  const classes = useStyles()
  const [values, setValues] = useState<ISLeaderDatePage>({})

  return (
    <Fragment>
      {/* <AppBarMain /> */}
      <ContainerMain></ContainerMain>
    </Fragment>
  )
}
