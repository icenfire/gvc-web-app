import React, { Fragment } from "react"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "100%"
    },
    card: {
      width: "100%"
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
)

export interface Props {
  date: any
}

export interface State {
  
}

function Dates(props: Props) {
  const classes = useStyles()
  const { date } = props;
  console.log("Dates", date);
  return (
    <Fragment>
      <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={date}
      />
      </Card>
    </Fragment>
  )
}

export default Dates