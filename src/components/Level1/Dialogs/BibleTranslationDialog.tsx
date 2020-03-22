import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import React, { FC, Fragment } from "react"
import { IBibleRef } from "src/components/Pages/BiblePage"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerVertical: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    containerHorizontal: {
      display: "flex",
    },
    itemHorizontal: {
      flex: 1,
    },
    return: {
      padding: 0,
    },
  })
)

export type Translation = "niv" | "nkrv" | "aeb"

export interface IPBibleTranslationDialog {
  bibleRef: IBibleRef
  setAndUploadBibleRef: (bibleRef: IBibleRef) => void
  openTranslation: boolean
  setOpenTranslation: (open: boolean) => void
}

export const BibleTranslationDialog: FC<IPBibleTranslationDialog> = props => {
  const {
    bibleRef,
    setAndUploadBibleRef,
    openTranslation,
    setOpenTranslation,
  } = props
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpenTranslation(true)
  }

  const handleClose = () => {
    setOpenTranslation(false)
  }

  const onClickItem = (translation: Translation) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAndUploadBibleRef({ ...bibleRef, translation })
    // setTranslation(translation)
    setOpenTranslation(false)
  }

  const display = {
    niv: "NIV",
    nkrv: "개역개정",
    aeb: "쉬운성경",
  }

  return (
    <Fragment>
      <Button onClick={handleClickOpen}>{`Translation: ${
        display[bibleRef.translation]
      }`}</Button>
      <Dialog
        open={openTranslation}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item>
              <IconButton
                onClick={handleClose}
                className={classes.return}
                aria-label="return"
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Typography variant="h6" align="center">
                Choose a Translation
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <div className={classes.containerVertical}>
            {(["niv", "nkrv", "aeb"] as Translation[]).map((t: Translation) =>
              bibleRef.translation === t ? (
                <Button
                  key={t}
                  onClick={onClickItem(t)}
                  variant="outlined"
                  color="primary"
                >
                  {display[t]}
                </Button>
              ) : (
                <Button key={t} onClick={onClickItem(t)}>
                  {display[t]}
                </Button>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
