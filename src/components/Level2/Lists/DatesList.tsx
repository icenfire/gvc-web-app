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
import moment, { Moment } from "moment"
import React, { Fragment } from "react"
import { useSelector } from "react-redux"
import { AppState } from "src/store/reducers/rootReducer"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      overflow: "auto",
      maxHeight: 400,
    },
    avatar: {
      backgroundColor: red[500],
    },
    subheader: {
      background: theme.palette.background.default,
    },
    ul: {
      padding: 0,
    },
    paper: {
      background: theme.palette.primary.main,
    },
    text: {
      color: theme.palette.secondary.dark,
    },
    container: {
      padding: theme.spacing(0.5),
    },
  })
)

export interface IPDatesList {
  from: Moment
  to: Moment
}
type MYandS = [string, Moment[]]
export interface State {}

function DatesList(props: IPDatesList) {
  const classes = useStyles()
  const { from, to } = props

  const search = useSelector<AppState, string>((state) => state.appBar.search)

  let pastSun = moment(from, "YYYYMMDD").day(7)
  const mYandSs: MYandS[] = []
  let thisSun = moment(to).day(0)
  while (pastSun <= thisSun) {
    let monthYear = moment(pastSun).format("MMMM YYYY")
    if (mYandSs.length === 0 || mYandSs[mYandSs.length - 1][0] !== monthYear) {
      mYandSs.push([monthYear, [pastSun]])
    } else {
      mYandSs[mYandSs.length - 1][1].push(pastSun)
    }
    pastSun = moment(pastSun).add(7, "days")
  }

  return (
    <List className={classes.root} subheader={<li />}>
      {mYandSs ? (
        mYandSs.map((mYandS) => {
          return (
            <li key={mYandS[0]}>
              <ul className={classes.ul}>
                <ListSubheader className={classes.subheader}>
                  <Typography align="center">{mYandS[0]}</Typography>
                </ListSubheader>
                {[...mYandS[1]]
                  .filter((sunday: Moment) =>
                    sunday.format("DD/MM/YYYY").includes(search)
                  )
                  .map((sunday) => {
                    return (
                      <Container
                        className={classes.container}
                        key={sunday.toString()}
                      >
                        <Paper className={classes.paper}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>80%</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={sunday.format("DD/MM/YYYY")}
                              className={classes.text}
                            />
                            <Typography className={classes.text}>
                              8/10
                            </Typography>
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
