import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { Fragment } from "react"
import SwipeableViews from "react-swipeable-views"

import { IPNotice } from "../../Level1/Papers/Notice"
import Notice from "../../Level1/Papers/Notice"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden"
    },
    swipeableViews: {
      padding: "0 20px"
    },
    slideContainer: {
      padding: "0 0px"
    },
    slide: {
      padding: 10,
      minHeight: 100
      // maxWidth: "100%"
    }
  })
)

const slideStyle: object = {
  padding: "0 0px"
}

export interface IPNotices {
  notices: IPNotice[]
}

function Notices(props: IPNotices) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Fragment>Swipeable notices</Fragment>
      <SwipeableViews
        className={classes.swipeableViews}
        slideStyle={slideStyle}
      >
        {props.notices &&
          [...props.notices]
            // Sort the notices chronologically
            .sort((t1: IPNotice, t2: IPNotice) => {
              return t1.createdAt > t2.createdAt ? 1 : -1
            })
            .map(notice => (
              <div key={notice.id} className={classes.slide}>
                <Notice {...notice} />
              </div>
            ))}
      </SwipeableViews>
    </div>
  )
}

export { Notices }
