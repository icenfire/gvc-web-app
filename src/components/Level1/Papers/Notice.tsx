import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { Fragment } from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      background: "white",
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column"
    }
  })
)

export interface IPNotice {
  id: string
  title: string
  content: string
  createdAt: Date
}

function Notice(props: IPNotice) {
  const classes = useStyles()

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default Notice
