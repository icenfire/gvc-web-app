import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"

import { AppBarMain } from "../Level1/AppBars/AppBarMain"
import { ContainerMain } from "../Level1/Containers/ContainerMain"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface IPNoticesPage {}

export interface ISNoticesPage {}

export const NoticesPage: FC<IPNoticesPage> = props => {
  const classes = useStyles()
  const [values, setValues] = useState<ISNoticesPage>({})

  return (
    <Fragment>
      <AppBarMain title="Notices" />
      <ContainerMain>Notices Page</ContainerMain>
    </Fragment>
  )
}
