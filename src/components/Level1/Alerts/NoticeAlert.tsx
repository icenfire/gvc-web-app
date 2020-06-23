import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Alert, AlertTitle } from '@material-ui/lab'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2)
      }
    }
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
      <Alert severity="info">
        <AlertTitle>{title}</AlertTitle>
        {content}
      </Alert>
    </div>
  )
}
