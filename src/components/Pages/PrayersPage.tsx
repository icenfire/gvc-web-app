import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"

import { AppBarMain } from "../Level1/AppBars/AppBarMain"
import { ContainerMain } from "../Level1/Containers/ContainerMain"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface IPPrayersPage {}

export interface ISPrayersPage {}

export const PrayersPage: FC<IPPrayersPage> = props => {
  const classes = useStyles()
  const [values, setValues] = useState<ISPrayersPage>({})

  return (
    <Fragment>
      <AppBarMain title="Prayers" />
      <ContainerMain>Prayers Page</ContainerMain>
    </Fragment>
  )
}
