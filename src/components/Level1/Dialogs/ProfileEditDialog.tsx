import Button from "@material-ui/core/Button"
import ButtonBase from "@material-ui/core/ButtonBase"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import EditIcon from "@material-ui/icons/Edit"
import PersonIcon from "@material-ui/icons/Person"
import VisibilityIcon from "@material-ui/icons/Visibility"
import { DatePicker } from "@material-ui/pickers"
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import React, { FC, Fragment } from "react"
import { useDispatch } from "react-redux"

import { editProfile } from "../../../store/actions/authActions"
import { IMember } from "../../../types"
import Image from "./../../../static/images/MinjungKang.jpg"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonBaseChildren: {
      width: "100%",
      display: "flex",
    },
    buttonBaseUpload: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    dialog: {},
    imageContainer: {
      position: "relative",
    },
    edit: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
    },

    text: {
      // color: theme.palette.common.black,
    },
    input: {
      display: "none",
      flex: 1,
    },
    image: {
      width: "100%",
    },
    overlay: {
      background: "rgba(0,0,0, 0.8)",
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 1,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  })
)

export interface IPProfileEditDialog {
  member: IMember
}

export const ProfileEditDialog: FC<IPProfileEditDialog> = props => {
  const [open, setOpen] = React.useState(false)
  const [edit, setEdit] = React.useState(false)
  const [member, setMember] = React.useState<IMember>({
    ...props.member,
    dob: props.member.dob.toDate(),
  })

  const stylesProps = { opacity: edit ? 0.2 : 1 } as { opacity: number }

  const classes = useStyles(stylesProps)
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setEdit(false)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const cleanUpAfterSave = () => {
    setOpen(false)
  }

  const handleSave = (member: IMember) => (
    event: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    dispatch(editProfile(member, cleanUpAfterSave))
  }

  const handleClickEdit = () => {
    console.log("Clicked!")
    setEdit(!edit)
  }

  return (
    <Fragment>
      <ButtonBase
        onClick={handleClickOpen}
        className={classes.buttonBaseChildren}
      >
        {props.children}
      </ButtonBase>
      <Dialog
        PaperProps={{ className: classes.dialog }}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          disableTypography
          id="form-dialog-title"
          className={classes.text}
        >
          <Typography variant="h6">Member Profile</Typography>
          <IconButton
            onClick={handleClickEdit}
            className={classes.edit}
            aria-label="settings"
          >
            {edit ? <VisibilityIcon /> : <EditIcon />}
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item xs={12}>
              <Fragment>
                {edit && (
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                  />
                )}
                <label
                  htmlFor="icon-button-file"
                  className={classes.imageContainer}
                >
                  <ButtonBase
                    className={classes.buttonBaseUpload}
                    disabled={!edit}
                    component="span"
                  >
                    {Image ? (
                      <img
                        src={Image}
                        alt={member.name}
                        className={classes.image}
                      />
                    ) : edit ? (
                      <Fragment>
                        <CloudUploadIcon />
                        <Typography>Upload Image</Typography>
                      </Fragment>
                    ) : (
                      <PersonIcon />
                    )}
                    {edit && Image && (
                      <div className={classes.overlay}>
                        <CloudUploadIcon />
                        <Typography>Upload Image</Typography>
                      </div>
                    )}
                  </ButtonBase>
                </label>
              </Fragment>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-name-input"
                label="Name"
                value={member.name}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                  >
                ) => {
                  setMember({ ...member, name: event.target.value })
                }}
                fullWidth
                disabled={!edit}
                InputLabelProps={{ className: classes.text }}
                InputProps={{ className: classes.text }}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                disableFuture
                openTo="year"
                format="dd/MM/yyyy"
                label="Date of birth"
                views={["year", "month", "date"]}
                value={member.dob}
                onChange={(date: MaterialUiPickersDate) => {
                  setMember({ ...member, dob: date })
                }}
                InputLabelProps={{ className: classes.text }}
                InputProps={{ className: classes.text }}
                disabled={!edit}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {edit ? (
            <Grid container justify="space-around">
              <Grid item>
                <Button onClick={handleClose} className={classes.text}>
                  CANCEL
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={handleSave(member)} className={classes.text}>
                  SAVE
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Button onClick={handleClose} className={classes.text}>
              RETURN
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
