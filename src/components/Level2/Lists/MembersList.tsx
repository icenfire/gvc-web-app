import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import React, { Fragment } from "react"

import { IMemberDownload } from "../../../types"
import { ProfileEditDialog } from "../../Level1/Dialogs/ProfileEditDialog"
import { AddCellMemberPaper } from "../../Level1/Papers/AddCellMemberPaper"
import { IPMemberPaper } from "../../Level1/Papers/MemberPaper"
import { MemberPaper } from "../../Level1/Papers/MemberPaper"

// import { IMember } from "./../../../interfaces"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      overflow: "auto",
      // maxHeight: 200,
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

export interface Props {
  members: IMemberDownload[]
  editMode: boolean
  filter: string
}

export function MembersList({ members, editMode, filter }: Props) {
  const classes = useStyles()

  return (
    <Fragment>
      <List className={classes.root} subheader={<li />}>
        <ListItem className={classes.listItem}>
          <AddCellMemberPaper
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              console.log("Clicked!")
            }}
          />
        </ListItem>
        {members ? (
          [...members]
            .filter(member =>
              member.name
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase())
            )
            .sort((member1, member2) => {
              return member1.name > member2.name ? 1 : -1
            })
            .map(member => {
              return (
                <ListItem className={classes.listItem} key={member.id}>
                  <ProfileEditDialog member={member}>
                    <MemberPaper member={member} editMode={editMode} />
                  </ProfileEditDialog>
                </ListItem>
              )
            })
        ) : (
          <p>Loading Members...</p>
        )}
      </List>
    </Fragment>
  )
}
