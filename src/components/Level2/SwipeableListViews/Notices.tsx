import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { Fragment } from "react"
import SwipeableViews from "react-swipeable-views"

import { Props as INoticeWithMeta } from "../../Level1/Papers/Notice"
import Notice from "../../Level1/Papers/Notice"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
    },
    swipeableViews: {
      padding: "0 20px",
    },
    slideContainer: {
      padding: "0 0px",
    },
    slide: {
      padding: 10,
      height: "100%",
    },
  })
)

const slideStyle: object = {
  padding: "0 0px",
}

export interface IPNotices {
  notices: INoticeWithMeta[]
}

function Notices(props: IPNotices) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <SwipeableViews
        className={classes.swipeableViews}
        slideStyle={slideStyle}
      >
        {props.notices ? (
          // [...props.notices]
          //   // Sort the notices chronologically
          //   .sort((t1: INoticeWithMeta, t2: INoticeWithMeta) => {
          //     return t1.createdAt > t2.createdAt ? 1 : -1
          //   })
          props.notices.map(notice => (
            <div key={notice.id} className={classes.slide}>
              <Notice {...notice} />
            </div>
          ))
        ) : (
          <Typography>Loading...</Typography>
        )}
      </SwipeableViews>
    </div>
  )
}

export { Notices }
