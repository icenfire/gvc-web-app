import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import PersonIcon from "@material-ui/icons/Person"
import React, { Fragment } from "react"

import { IMember } from "../../../types"

// import { IMember } from "./../../../interfaces"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    paper: {
      background: theme.palette.primary.main,
      width: "100%",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    textMember: {
      color: theme.palette.secondary.dark,
    },
  })
)

export interface IPMemberPaper {
  member: IMember
  editMode: boolean
}

export const MemberPaper: React.FC<IPMemberPaper> = ({
  member: { id, name, dob, cell, positions },
  editMode,
}) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      {id ? (
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Avatar className={classes.IconButtonEditMember}>
              <PersonIcon />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography className={classes.textMember} align="left">
              {name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.textMember} align="right">
              {dob.toDate().toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Paper>
  )
}
