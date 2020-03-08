import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"

import { AppBarMain } from "../Level1/AppBars/AppBarMain"
import { ContainerMain } from "../Level1/Containers/ContainerMain"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface IPCalendarPage {}

export interface ISCalendarPage {}

export const CalendarPage: FC<IPCalendarPage> = props => {
  const classes = useStyles()
  const [values, setValues] = useState<ISCalendarPage>({})

  return (
    <Fragment>
      <AppBarMain title="Calendar" />
      <ContainerMain>Calendar Page</ContainerMain>
    </Fragment>
  )
}
