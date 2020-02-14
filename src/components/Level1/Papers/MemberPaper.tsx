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

export interface Props {
  member: { name: string; dob: any } // dob passed from Firestore is a Timestamp data type which needs to be converted first to Date type
  editMode: boolean
}

export const MemberPaper: React.FC<Props> = props => {
  const {
    member: { name, dob },
    editMode,
  } = props
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      {props ? (
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
            <Typography className={classes.textMember}>{name}</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.textMember}>
              {/* {1234} */}
              {dob.toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Paper>
  )
}
