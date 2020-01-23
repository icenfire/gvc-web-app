import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle"
import React, { Fragment } from "react"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import { compose } from "redux"

import NoticeCreator from "../Level2/NoticeCreator"
import { Dates } from "./../Level2/DatesList"
import { Notices as NoticesGridList } from "./../Level2/GridLists/Notices"
import { Notices as NoticesSwipeable } from "./../Level2/SwipeableListViews/Notices"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

function Playground(props: any) {
  const classes = useStyles()

  const dates = [
    ["January 2020", ["01.01.20", "02.01.20"]],
    ["February 2020", ["01.02.20", "02.02.20"]],
    ["March 2020", ["01.03.20", "02.03.20"]],
    ["April 2020", ["01.04.20", "02.04.20"]]
  ]
  return (
    <Fragment>
      <Fragment>Notices in scrollable Grid List</Fragment>
      <NoticesGridList notices={props.notices} />
      <Fragment>Notices in Swipeable List View</Fragment>
      <NoticesSwipeable notices={props.notices} />
      <Fragment>Notice creator</Fragment>
      <NoticeCreator />

      <IconButton>
        <RemoveCircleIcon fontSize="large" />
      </IconButton>

      <Dates dates={dates} />
    </Fragment>
  )
}

const mapStateToProps = (state: any) => {
  state.firestore.ordered.notices &&
    console.log(state.firestore.ordered.notices)
  return {
    notices: state.firestore.ordered.notices
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "notices" }])
)(Playground)
