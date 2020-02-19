import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { Fragment } from "react"

import { PrayerPaper } from "../../Level1/Papers/PrayerPaper"

// import { Iprayer } from "./../../../interfaces"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      overflow: "auto",
      maxHeight: 400,
    },

    subheader: {
      background: theme.palette.background.default,
    },
    paper: {
      background: theme.palette.primary.main,
      width: "100%",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    textEdit: {
      color: theme.palette.secondary.light,
    },
    textprayer: {
      color: theme.palette.secondary.dark,
    },

    listItem: {
      padding: theme.spacing(0.5),
    },
  })
)

export interface Props {
  membersDic: {
    [memberId: string]: {
      cell: string
      dob: any
      name: string
      positions: string[]
    }
  }
  prayers: {
    prayer: string
    id: string
    date: any
    memberId: string
  }[]
}

export function PrayersList({ membersDic, prayers }: Props) {
  const classes = useStyles()
  return (
    <Fragment>
      <List className={classes.root} subheader={<li />}>
        {prayers ? (
          prayers
            .sort((p1: Props["prayers"][0], p2: Props["prayers"][0]) => {
              return membersDic[p1.memberId].name > membersDic[p2.memberId].name
                ? 1
                : -1
            })
            .map((prayerObj: Props["prayers"][0]) => {
              const { prayer, id, date, memberId } = prayerObj
              return (
                <ListItem className={classes.listItem} key={id}>
                  <PrayerPaper
                    prayer={prayer}
                    name={membersDic[memberId].name}
                    dob={membersDic[memberId].dob.toDate()}
                  />
                </ListItem>
              )
            })
        ) : (
          <p>Loading...</p>
        )}
      </List>
    </Fragment>
  )
}
