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
import { IMember } from "../Papers/MemberPaper"
import Image from "./../../../static/images/MinjungKang.jpg"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageContainer: {
      position: "relative",
      maxHeight: "100",
    },
    dialog: {
      // background: theme.palette.common.white,
    },
    edit: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    gridItem: {
      display: "flex",
      justifyContent: "center",
    },
    iconButton: {
      margin: "auto auto",
      // left: 0,
      // top: 0,
      // zIndex: 1,
      // position: "absolute",
      // background: theme.palette.background.default,
      // color: theme.palette.common.white,
      // padding: theme.spacing(1),
      // flex: 1,
    },
    text: {
      // color: theme.palette.common.black,
    },
    icon: {
      // fontSize: 100,
    },
    input: {
      display: "none",
      flex: 1,
    },
    imageOpaque: {
      width: "100%",
      opacity: 0.2,
    },
    imageOriginal: {
      width: "100%",
      opacity: 1,
    },
    overlay: {
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 1,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
    },
  })
)

export interface IPProfileEditDialog {
  children: React.ReactElement<any>
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
      {React.cloneElement(props.children, { onClick: handleClickOpen })}
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
            <Grid item xs={12} className={classes.gridItem}>
              <Fragment>
                {edit && (
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                  />
                )}
                <label htmlFor="icon-button-file">
                  <div className={classes.imageContainer}>
                    {false ? (
                      <img
                        src={Image}
                        alt={member.name}
                        className={
                          edit ? classes.imageOpaque : classes.imageOriginal
                        }
                      />
                    ) : (
                      !edit && <PersonIcon className={classes.icon} />
                    )}
                    {edit && (
                      <div className={classes.overlay}>
                        <IconButton
                          className={classes.iconButton}
                          component="div"
                        >
                          <CloudUploadIcon className={classes.icon} />
                        </IconButton>
                      </div>
                    )}
                  </div>
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
          <Button onClick={handleClose} className={classes.text}>
            Cancel
          </Button>
          <Button onClick={handleSave(member)} className={classes.text}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
