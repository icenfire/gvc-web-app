import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import React, { FC, Fragment } from "react"
import { useSelector } from "react-redux"
import { IBibleRef } from "src/components/Pages/BiblePage"
import { BibleState } from "src/store/reducers/bibleReducer"
import { AppState } from "src/store/reducers/rootReducer"

import { Translation } from "./BibleTranslationDialog"

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
      borderColor: theme.palette.primary.main,
      borderWidth: theme.spacing(0.1),
      borderStyle: "solid",
    },
    return: {
      padding: 0,
    },
  })
)

export interface IPBibleBookDialog {
  bibleRef: IBibleRef
  setAndUploadBibleRef: (bibleRef: IBibleRef) => void
  openBook: boolean
  setOpenBook: (open: boolean) => void
  setOpenChapter: (open: boolean) => void
}

export const BibleBookDialog: FC<IPBibleBookDialog> = props => {
  const {
    bibleRef,
    setAndUploadBibleRef,
    openBook,
    setOpenBook,
    setOpenChapter,
  } = props
  const classes = useStyles()

  const bibleIndex = useSelector<AppState, BibleState["index"]>(
    state => state.bible.index
  )

  const handleClickOpen = () => {
    setOpenBook(true)
  }

  const handleClose = () => {
    setOpenBook(false)
  }

  const onClickItem = (i: number) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAndUploadBibleRef({ ...bibleRef, book: i, chapter: null })
    // setBook(i)
    // setChapter(null)
    setOpenBook(false)
    setOpenChapter(true)
  }

  const translate = () =>
    bibleRef.translation === "niv" ? "english" : "korean"

  return (
    <Fragment>
      <Button onClick={handleClickOpen}>
        {bibleRef.book !== null
          ? `Book: ${bibleIndex[translate()][bibleRef.book]}`
          : "Book"}
      </Button>
      <Dialog
        open={openBook}
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
                Choose a Book
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <div className={classes.containerHorizontal}>
            {["old", "new"].map(testament => (
              <div key={testament} className={classes.itemHorizontal}>
                <Typography variant="h6" align="center">
                  {testament === "old"
                    ? bibleRef.translation === "niv"
                      ? "Old Testament"
                      : "구약"
                    : bibleRef.translation === "niv"
                    ? "New Testament"
                    : "신약"}
                </Typography>
                <Divider />
                <div className={classes.containerVertical}>
                  {bibleIndex[
                    testament === "old" ? "indicesOld" : "indicesNew"
                  ].map(i => (
                    <div key={i}>
                      {bibleRef.book === i ? (
                        <Button
                          onClick={onClickItem(i)}
                          variant="outlined"
                          color="primary"
                        >
                          {bibleIndex[translate()][i]}
                        </Button>
                      ) : (
                        <Button onClick={onClickItem(i)}>
                          {bibleIndex[translate()][i]}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
