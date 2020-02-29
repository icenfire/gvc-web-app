import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import PersonIcon from "@material-ui/icons/Person"
import { DatePicker } from "@material-ui/pickers"
import React, { Fragment } from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      background: theme.palette.common.white,
    },
    IconButtonEditMember: {
      background: theme.palette.background.default,
      color: theme.palette.common.white,
      padding: theme.spacing(1),
    },
    text: {
      color: theme.palette.common.black,
    },
    input: {
      display: "none",
    },
  })
)

export interface IPProfileEditDialog {
  children: React.ReactElement<any>
}

function ProfileEditDialog(props: IPProfileEditDialog) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Fragment>
      {React.cloneElement(props.children, { onClick: handleClickOpen })}
      <Dialog
        PaperProps={{ className: classes.dialog }}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.text}>
          Edit Profile
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText className={classes.text}>
            Edit profile below
          </DialogContentText> */}
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  className={classes.IconButtonEditMember}
                  component="span"
                >
                  <PersonIcon />
                </IconButton>
              </label>
            </Grid>
            <Grid item xs>
              <TextField
                id="standard-name-input"
                margin="dense"
                label="Name"
                value="강민정"
                fullWidth
                InputLabelProps={{ className: classes.text }}
                InputProps={{ className: classes.text }}
              />
            </Grid>
            <Grid item xs={3}>
              <DatePicker
                color="primary"
                disableFuture
                openTo="year"
                format="dd/MM/yyyy"
                label="Date of birth"
                views={["year", "month", "date"]}
                value={"10.09.1990"}
                onChange={() => 1}
                InputLabelProps={{ className: classes.text }}
                InputProps={{ className: classes.text }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.text}>
            Cancel
          </Button>
          <Button onClick={handleClose} className={classes.text}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export { ProfileEditDialog }
