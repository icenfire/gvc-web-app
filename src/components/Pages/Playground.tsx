import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { Fragment } from "react"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import { compose } from "redux"

import NoticeCreator from "../Level2/NoticeCreator"
import { Notices } from "./../Level2/GridLists/Notices"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

function Playground(props: any) {
  const classes = useStyles()

  return (
    <Fragment>
      <Notices notices={props.notices} />
      <NoticeCreator />
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
