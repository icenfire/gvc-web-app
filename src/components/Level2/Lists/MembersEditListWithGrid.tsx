import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import PersonIcon from "@material-ui/icons/Person"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import RemoveIcon from "@material-ui/icons/Remove"
import React, { Fragment } from "react"

import { MemberPaper } from "./../../Level1/Papers/MemberPaper"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      overflow: "auto",
      maxHeight: 200,
    },
    IconButtonAddMember: {
      background: theme.palette.common.white,
      color: theme.palette.background.default,
      padding: theme.spacing(1),
    },
    IconButtonEditMember: {
      background: theme.palette.background.default,
      color: theme.palette.common.white,
      padding: theme.spacing(1),
    },
    IconButtonRemoveMember: {
      background: theme.palette.common.white,
      color: theme.palette.background.default,
      padding: theme.spacing(1),
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
    textMember: {
      color: theme.palette.secondary.dark,
    },

    listItem: {
      padding: theme.spacing(0.5),
    },
  })
)

export interface IPMembersEditList {
  members: { name: string; dob: string }[]
}

export interface State {}

function MembersEditListWithGrid(props: IPMembersEditList) {
  const classes = useStyles()
  const { members } = props
  return (
    <List className={classes.root} subheader={<li />}>
      <ListItem>
        <ListItemAvatar>
          <IconButton className={classes.IconButtonAddMember}>
            <PersonAddIcon />
          </IconButton>
        </ListItemAvatar>
        <ListItemText primary="Add cell member" className={classes.textEdit} />
      </ListItem>
      {members ? (
        members.map((member: IPMembersEditList["members"][0], index) => {
          return (
            <ListItem className={classes.listItem} key={index}>
              <MemberPaper name={member.name} dob={member.dob} editMode />
            </ListItem>
          )
        })
      ) : (
        <p>Loading...</p>
      )}
    </List>
  )
}

export { MembersEditListWithGrid }
