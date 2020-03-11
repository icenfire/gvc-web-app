import Button from "@material-ui/core/Button"
import ButtonBase from "@material-ui/core/ButtonBase"
import CircularProgress from "@material-ui/core/CircularProgress"
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
      background: "rgba(0,0,0, 0.5)",
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

export interface ISLocalImage {
  file: File | null
  url: string
}

export interface ISProgress {
  value: number
  loading: boolean
}

export const ProfileEditDialog: FC<IPProfileEditDialog> = props => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [edit, setEdit] = React.useState<boolean>(false)
  const [localImage, setLocalImage] = React.useState<ISLocalImage>({
    file: null,
    url: "",
  })
  const [progress, setProgress] = React.useState<number>(0)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [member, setMember] = React.useState<IMember>({
    ...props.member,
    dob: props.member.dob.toDate(),
  })

  const classes = useStyles()
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
    dispatch(
      editProfile(
        member,
        localImage.file,
        setProgress,
        setLoading,
        cleanUpAfterSave
      )
    )
  }

  const handleClickEdit = () => {
    console.log("Clicked!")
    setEdit(!edit)
  }

  const imageHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files && event.target.files[0]
    const reader = new FileReader()
    reader.onloadstart = e => {
      setLoading(true)
    }
    reader.onloadend = e => {
      const imageUrl = typeof reader.result === "string" ? reader.result : ""
      setLocalImage({ ...localImage, file: imageFile, url: imageUrl })
      setLoading(false)
    }
    const result = imageFile ? reader.readAsDataURL(imageFile) : ""
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
                    onChange={imageHandleChange}
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
                    {localImage.url || member.photoUrl ? (
                      <img
                        src={localImage.url || member.photoUrl}
                        alt={member.name}
                        className={classes.image}
                      />
                    ) : edit ? (
                      loading ? (
                        <CircularProgress />
                      ) : (
                        <Fragment>
                          <CloudUploadIcon />
                          <Typography>Upload Image</Typography>
                        </Fragment>
                      )
                    ) : (
                      <PersonIcon />
                    )}
                    {edit && (localImage.url || member.photoUrl) && (
                      <div className={classes.overlay}>
                        {loading ? (
                          <CircularProgress />
                        ) : (
                          <Fragment>
                            <CloudUploadIcon />
                            <Typography>Upload Image</Typography>
                          </Fragment>
                        )}
                        {/* {loading && (
                          <CircularProgress
                            variant="determinate"
                            value={progress}
                          />
                        )} */}
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
              <TextField
                id="standard-cell-input"
                label="Cell"
                value={member.cell}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLTextAreaElement | HTMLInputElement
                  >
                ) => {
                  setMember({ ...member, cell: event.target.value })
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
                <Button
                  onClick={handleClose}
                  className={classes.text}
                  disabled={loading}
                >
                  CANCEL
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleSave(member)}
                  className={classes.text}
                  disabled={loading}
                >
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
