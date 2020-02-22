import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { FC, Fragment } from "react"

import { INoticeWithMeta } from "../../../types"

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

export const Notice: FC<INoticeWithMeta> = notice => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography color="primary" variant="subtitle2">
        {notice.title}
      </Typography>

      {notice.content.split("\n").map((text, key) => {
        return (
          <Typography key={key} color="secondary" variant="body2">
            {text}
          </Typography>
        )
      })}
    </Paper>
  )
}
