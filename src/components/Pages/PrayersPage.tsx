import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"

import { AppState } from "../../store/reducers/rootReducer"
import { AppBarMain } from "../Level1/AppBars/AppBarMain"
import { ContainerMain } from "../Level1/Containers/ContainerMain"
import { PrayersList } from "../Level2/Lists/PrayersList"
import { Notices } from "../Level2/SwipeableListViews/Notices"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface IPPrayersPage {}

export interface ISPrayersPage {}

export const PrayersPage: FC<IPPrayersPage> = props => {
  const classes = useStyles()
  const [values, setValues] = useState<ISPrayersPage>({})

  useFirestoreConnect([
    { collection: "notices", orderBy: ["createdAt", "asc"] },
  ])
  useFirestoreConnect("members")
  useFirestoreConnect("prayers")

  const stateFS = useSelector<AppState, any>(state => state.firestore)

  const noticesArr = stateFS.ordered.notices
  const membersDic = stateFS.data.members
  const prayersArr = stateFS.ordered.prayers

  const search = useSelector<AppState, string>(state => state.appBar.search)

  return (
    <Fragment>
      <AppBarMain title="Prayers" />
      <ContainerMain>
        <Notices notices={noticesArr} />
        <PrayersList
          prayers={prayersArr}
          membersDic={membersDic}
          filter={search}
        />
      </ContainerMain>
    </Fragment>
  )
}
