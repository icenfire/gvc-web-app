import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { Fragment } from "react"
import { connect } from "react-redux"

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
  return {
    notices: state.notice.notices
  }
}

export default connect(mapStateToProps)(Playground)
