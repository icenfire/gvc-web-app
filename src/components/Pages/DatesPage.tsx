import Grid from "@material-ui/core/Grid"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { DatePicker } from "@material-ui/pickers"
import moment, { Moment } from "moment"
import React, { FC, Fragment, useState } from "react"

import { DatesList } from "../Level2/Lists/DatesList"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface ISDatesPage {
  from: Moment
  to: Moment
}

export const DatesPage: FC = () => {
  const classes = useStyles()
  const [dates, setDates] = useState<ISDatesPage>({
    from: moment("20200101", "YYYYMMDD"),
    to: moment(),
  })

  const changeDate = (dateType: keyof ISDatesPage) => (date: Date | null) => {
    if (date) {
      setDates({ ...dates, [dateType]: moment(date) })
    }
  }

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={6}>
          <DatePicker
            label={"From"}
            value={dates.from.toDate()}
            disableFuture
            openTo="year"
            format="dd/MM/yyyy"
            views={["year", "month", "date"]}
            onChange={changeDate("from")}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label={"To"}
            value={dates.to.toDate()}
            disableFuture
            openTo="year"
            format="dd/MM/yyyy"
            views={["year", "month", "date"]}
            onChange={changeDate("to")}
          />
        </Grid>
      </Grid>
      <DatesList from={dates.from} to={dates.to} />
    </Fragment>
  )
}
