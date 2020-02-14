import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { Fragment } from "react"

import { State as INotice } from "./../../Level2/NoticeCreator"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      background: theme.palette.common.white,
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      height: "100%",
    },
  })
)

export interface Props extends INotice {
  id: string
  createdAt: Date
}

function Notice(props: Props) {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography color="primary" variant="subtitle2">
        {props.title}
      </Typography>

      {props.content.split("\n").map((text, key) => {
        return (
          <Typography key={key} color="secondary" variant="body2">
            {text}
          </Typography>
        )
      })}
    </Paper>
  )
}

export default Notice
