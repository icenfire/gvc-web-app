import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { Fragment } from "react"

import { Notices } from "./../Level2/GridLists/Notices"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

const notices = [
  {
    title: "공지",
    content:
      "이번주 예배는 2부로 나누어 드립니다\n\n\n1부는 1:30 2부는 4:00셀원들에게 잘 광고해주세요."
  },
  {
    title: "생일",
    content: "It's Johnny's birthday today!"
  },
  {
    title: "생일",
    content: "It's Johnny's birthday today!"
  },
  {
    title: "생일",
    content: "It's Johnny's birthday today!"
  },
  {
    title: "생일",
    content: "It's Johnny's birthday today!"
  },
  {
    title: "생일",
    content: "It's Johnny's birthday today!"
  }
]

function Playground() {
  const classes = useStyles()

  return (
    <Fragment>
      <Notices notices={notices} />
    </Fragment>
  )
}

export { Playground }
