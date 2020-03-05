import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"

import { AppState } from "../../store/reducers/rootReducer"
import { AppBarMain } from "../Level1/AppBars/AppBarMain"
import { ContainerMain } from "../Level1/Containers/ContainerMain"
import { MembersList } from "../Level2/Lists/MembersList"
import { Notices } from "../Level2/SwipeableListViews/Notices"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface IPMembersPage {}

export interface ISMembersPage {
  editMode: boolean
}

export const MembersPage: FC<IPMembersPage> = props => {
  const classes = useStyles()
  const [values, setValues] = useState<ISMembersPage>({
    editMode: false,
  })

  const search = useSelector<AppState, string>(state => state.appBar.search)

  // Get notices from Firestore
  useFirestoreConnect([
    { collection: "notices", orderBy: ["createdAt", "asc"] },
  ])
  // Get members from Firestore
  useFirestoreConnect("members")
  const stateFS = useSelector<AppState, any>(state => state.firestore)
  const membersArr = stateFS.ordered.members
  const noticesArr = stateFS.ordered.notices

  return (
    <Fragment>
      <AppBarMain />
      <ContainerMain>
        <Notices notices={noticesArr} />
        <MembersList members={membersArr} editMode={false} filter={search} />
      </ContainerMain>
    </Fragment>
  )
}
