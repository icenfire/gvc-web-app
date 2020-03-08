import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import PersonIcon from "@material-ui/icons/Person"
import RemoveIcon from "@material-ui/icons/Remove"
import React, { Fragment } from "react"

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

export interface IMember {
  id: string
  name: string
  dob: any // dob passed from Firestore is a Timestamp data type which needs to be converted first to Date type
  cell: string
  positions: string[]
}

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
          {editMode && (
            <Grid item>
              <IconButton className={classes.IconButtonRemoveMember}>
                <RemoveIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item>
            <IconButton className={classes.IconButtonEditMember}>
              <PersonIcon />
            </IconButton>
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
