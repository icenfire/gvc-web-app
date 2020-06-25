import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import moment, { Moment } from "moment"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { isLoaded, useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"

import { AppState } from "../../store/reducers/rootReducer"
import { NoticeAlert } from "../Level1/Alerts/NoticeAlert"
import { PrayersContainer } from "../Level2/Lists/PrayersContainer"
import { PrayersList } from "../Level2/Lists/PrayersList"
import { Notices } from "../Level2/SwipeableListViews/Notices"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({ divider: { backgroundColor: theme.palette.common.black } })
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
      <AppBarMain title="Prayers" />
      <ContainerMain>
        <NoticeAlert
          title={"출석체크"}
          content={"프로필 이미지를 누르면 출석으로 저장됩니다."}
        />
        <Button
          onClick={() => {
            setDate(moment("2020/06/07"))
          }}
          color="secondary"
          variant="contained"
        >
          Test changing date with prayers
        </Button>
        <Typography variant="h4">{date.format("DD MMM YYYY")}</Typography>
        <Divider className={classes.divider} />
        {isLoaded(prayers) && isLoaded(members) ? (
          <PrayersContainer prayers={prayers} members={members} date={date} />
        ) : (
          "Loading data..."
        )}
      </ContainerMain>
    </Fragment>
  )
}
