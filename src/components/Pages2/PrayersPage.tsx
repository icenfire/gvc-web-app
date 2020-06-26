import InputAdornment from "@material-ui/core/InputAdornment"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import EventIcon from "@material-ui/icons/Event"
import { DatePicker } from "@material-ui/pickers"
import moment, { Moment } from "moment"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { isLoaded, useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"

import { AppState } from "../../store/reducers/rootReducer"
import { NoticeAlert } from "../Level1/Alerts/NoticeAlert"
import { PrayersContainer } from "../Level2/Lists/PrayersContainer"
import { Notices } from "../Level2/SwipeableListViews/Notices"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: { backgroundColor: theme.palette.common.black },
    datePicker: { fontSize: theme.typography.h4.fontSize },
  })
)

export interface IPPrayersPage {}

export const PrayersPage: FC<IPPrayersPage> = (props) => {
  const classes = useStyles()
  const [date, setDate] = useState<Moment>(moment().day(0))
  const profile = useSelector<AppState, any>((state) => state.firebase.profile)

  useFirestoreConnect([
    { collection: "notices", orderBy: ["createdAt", "asc"] },
  ])

  useFirestoreConnect([
    {
      collection: "members",
      orderBy: ["name", "asc"],
      where: ["cell", "==", profile.cell ? profile.cell : ""],
    },
  ])

  useFirestoreConnect([
    {
      collection: "prayers",
      where: [
        ["date", "<=", moment(date).add(1, "day").toDate()],
        ["date", ">=", moment(date).subtract(1, "day").toDate()],
        ["cell", "==", profile.cell ? profile.cell : ""],
      ],
    },
  ])

  const stateFS = useSelector<AppState, any>((state) => state.firestore)

  const notices = stateFS.ordered.notices
  const members = stateFS.ordered.members
  const prayers = stateFS.ordered.prayers

  isLoaded(prayers)

  return (
    <Fragment>
      <AppBarMain title="기도제목" />
      <ContainerMain>
        <NoticeAlert
          title={"출석체크"}
          content={"프로필 이미지를 누르면 출석으로 저장됩니다."}
        />

        <DatePicker
          fullWidth
          shouldDisableDate={(date) => date?.getDay() !== 0}
          value={date.toDate()}
          disableFuture
          format="dd MMM yyyy"
          onChange={(date: Date | null) => {
            if (date) {
              setDate(moment(date))
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EventIcon />
              </InputAdornment>
            ),
            classes: { input: classes.datePicker },
          }}
        />
        {isLoaded(prayers) && isLoaded(members) ? (
          <PrayersContainer prayers={prayers} members={members} date={date} />
        ) : (
          "Loading data..."
        )}
      </ContainerMain>
    </Fragment>
  )
}
