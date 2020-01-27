import Avatar from "@material-ui/core/Avatar"
import { red } from "@material-ui/core/colors"
import Container from "@material-ui/core/Container"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import React, { Fragment } from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      overflow: "auto",
      maxHeight: 200
    },
    avatar: {
      backgroundColor: red[500]
    },
    subheader: {
      background: theme.palette.background.default
    },
    paper: {
      background: theme.palette.secondary.light
    },
    text: {
      color: theme.palette.secondary.dark
    },
    container: {
      padding: theme.spacing(0.5)
    }
  })
)

const hey = Array("1")

export interface IPDatesList {
  dates: [string, string[]][]
}

export interface State {}

function DatesList(props: IPDatesList) {
  const classes = useStyles()
  const { dates } = props
  return (
    <List className={classes.root} subheader={<li />}>
      {dates ? (
        dates.map((monthDates: IPDatesList["dates"][0]) => {
          return (
            <li key={monthDates[0]}>
              <ul>
                <ListSubheader className={classes.subheader}>
                  <Typography align="center">{monthDates[0]}</Typography>
                </ListSubheader>
                {monthDates[1].map((date: string) => {
                  return (
                    <Container className={classes.container} key={date}>
                      <Paper className={classes.paper}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>80%</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={date}
                            className={classes.text}
                          />
                          <Typography className={classes.text}>8/10</Typography>
                        </ListItem>
                      </Paper>
                    </Container>
                  )
                })}
              </ul>
            </li>
          )
        })
      ) : (
        <p>Loading...</p>
      )}
    </List>
  )
}

export { DatesList }
