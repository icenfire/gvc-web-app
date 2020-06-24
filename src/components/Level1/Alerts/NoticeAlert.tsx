import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import InfoIcon from "@material-ui/icons/Info"
import { Alert, AlertTitle } from "@material-ui/lab"
import React, { FC } from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
)

interface IPNoticeAlert {
  title: string
  content: string
}

export const NoticeAlert: FC<IPNoticeAlert> = ({ title, content }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Alert severity="info" icon={<InfoIcon />}>
        <AlertTitle>{title}</AlertTitle>
        {content}
      </Alert>
    </div>
  )
}
