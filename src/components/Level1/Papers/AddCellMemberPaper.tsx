import Avatar from "@material-ui/core/Avatar"
import ButtonBase from "@material-ui/core/ButtonBase"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import React, { Fragment } from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonBase: {
      background: theme.palette.background.default,
      width: "100%",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    IconButtonAddMember: {
      background: theme.palette.common.white,
      color: theme.palette.background.default,
      padding: theme.spacing(1),
    },
    text: {
      // color: theme.palette.secondary.dark,
    },
  })
)

export interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const AddCellMemberPaper: React.FC<Props> = ({ onClick }) => {
  const classes = useStyles()

  return (
    <ButtonBase onClick={onClick} className={classes.buttonBase}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Avatar className={classes.IconButtonAddMember}>
            <PersonAddIcon />
          </Avatar>
        </Grid>
        <Grid item xs>
          <Typography className={classes.text} align="left">
            Add Cell Member
          </Typography>
        </Grid>
      </Grid>
    </ButtonBase>
  )
}
