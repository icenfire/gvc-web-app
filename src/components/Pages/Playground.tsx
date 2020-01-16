import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { Fragment } from "react"

import Notices from "./../Level1/Papers/Notices"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

function Playground() {
  const classes = useStyles()

  return (
    <Fragment>
      <Notices title="공지" content="이번주 예배는 2부로 나누어 드립니다 1부는 1:30 2부는 4:00셀원들에게 잘 광고해주세요."/>
    </Fragment>
  )
}

export { Playground }
