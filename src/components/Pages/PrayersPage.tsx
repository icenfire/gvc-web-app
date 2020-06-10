import Button from "@material-ui/core/Button"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import moment from "moment"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"

import { AppState } from "../../store/reducers/rootReducer"
import { IPDatesList } from "../Level2/Lists/DatesList"
import { PrayersList } from "../Level2/Lists/PrayersList"
import { Notices } from "../Level2/SwipeableListViews/Notices"
import { DatesPage } from "./DatesPage"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface IPPrayersPage {}
type ViewMode = "dates" | "members" | "prayers"
export const PrayersPage: FC<IPPrayersPage> = (props) => {
  const classes = useStyles()
  const [viewMode, setViewMode] = useState<ViewMode>("dates")

  const profile = useSelector<AppState, any>((state) => state.firebase.profile)

  useFirestoreConnect([
    { collection: "notices", orderBy: ["createdAt", "asc"] },
  ])

  useFirestoreConnect([
    {
      collection: "members",
      where: ["cell", "==", profile.cell ? profile.cell : ""],
    },
  ])

  useFirestoreConnect([
    {
      collection: "prayers",
      where: ["cell", "==", profile.cell ? profile.cell : ""],
    },
  ])

  const stateFS = useSelector<AppState, any>((state) => state.firestore)

  const noticesArr = stateFS.ordered.notices
  const membersDic = stateFS.data.members
  const prayersArr = stateFS.ordered.prayers

  const search = useSelector<AppState, string>((state) => state.appBar.search)

  return (
    <Fragment>
      <AppBarMain title="Prayers" />
      <ContainerMain>
        <Notices notices={noticesArr} />
        <Button onClick={() => setViewMode("dates")}>Dates</Button>
        {viewMode=="dates" ? (
          <DatesPage />
        ) : (
          <PrayersList
            prayers={prayersArr}
            membersDic={membersDic}
            filter={search}
          />
        )}
      </ContainerMain>
    </Fragment>
  )
}
