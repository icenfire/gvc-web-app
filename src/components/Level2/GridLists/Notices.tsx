import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { Fragment } from "react"

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
    gridList: {
      flexWrap: "nowrap",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)"
    }
  })
)

export interface IPNotices {
  notices: IPNotice[]
}

function Notices(props: IPNotices) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {props.notices &&
          props.notices.map(notice => (
            <GridListTile>
              <Notice {...notice} />
            </GridListTile>
          ))}
      </GridList>
    </div>
  )
}

export { Notices }
