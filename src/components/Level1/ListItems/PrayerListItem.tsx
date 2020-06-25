import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import DeleteIcon from "@material-ui/icons/Delete"
import { Moment } from "moment"
import React, { FC, Fragment, useEffect } from "react"
import { CustomList } from "src/components/Level2/Lists/CustomList"
import { IMemberDownload, IPrayer } from "src/types"

import { ProfileEditDialog } from "../Dialogs/ProfileEditDialog"
import { ProfileMenu } from "../Menus/ProfileMenu"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {},
  })
)
export interface IPPrayerListItem {
  member: IMemberDownload
  prayer: IPrayer
}

export const PrayerListItem: FC<IPPrayerListItem> = ({ member, prayer }) => {
  const [prayerState, setPrayerState] = React.useState<string>(prayer.content)
  const classes = useStyles()
  // TODO: THIS IS A TEMPORARY CODE WHICH REQUIRES IMMEDIATE FIXING
  // useEffect(() => {
  //   setPrayerState(prayer.content)
  // }, [prayer.content])

  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPrayerState(event.target.value)
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <ProfileEditDialog member={member}>
          <Avatar alt={member.name} src={member.thumbnailUrl} />
        </ProfileEditDialog>
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={<Typography>{member.name}</Typography>}
        secondary={
          <TextField
            fullWidth
            placeholder="기도제목을 입력해주세요"
            multiline
            rowsMax="2"
            value={prayerState}
            onChange={onChange}
          />
        }
      />

      <ListItemSecondaryAction>
        <ProfileMenu edge="end" />
      </ListItemSecondaryAction>
    </ListItem>
  )
}