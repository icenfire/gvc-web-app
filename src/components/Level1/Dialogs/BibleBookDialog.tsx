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
import { BibleIndexState } from "src/store/reducers/bibleIndexReducer"
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
  book: number | null
  setBook: (index: number) => void
  openBook: boolean
  setOpenBook: (open: boolean) => void
  setChapter: (index: number | null) => void
  setOpenChapter: (open: boolean) => void
  translation: Translation
}

export const BibleBookDialog: FC<IPBibleBookDialog> = props => {
  const {
    book,
    setBook,
    openBook,
    setOpenBook,
    setChapter,
    setOpenChapter,
    translation,
  } = props
  const classes = useStyles()

  const bibleIndex = useSelector<AppState, BibleIndexState>(
    state => state.bibleIndex
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
    setBook(i)
    setOpenBook(false)
    setChapter(null)
    setOpenChapter(true)
  }

  const translate = () => (translation === "niv" ? "english" : "korean")

  return (
    <Fragment>
      <Button onClick={handleClickOpen}>
        {book !== null ? `Book: ${bibleIndex[translate()][book]}` : "Book"}
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
              <div className={classes.itemHorizontal}>
                <Typography variant="h6" align="center">
                  {testament === "old"
                    ? translation === "niv"
                      ? "Old Testament"
                      : "구약"
                    : translation === "niv"
                    ? "New Testament"
                    : "신약"}
                </Typography>
                <Divider />
                <div className={classes.containerVertical}>
                  {bibleIndex[
                    testament === "old" ? "indicesOld" : "indicesNew"
                  ].map(i => (
                    <div key={i}>
                      {book === i ? (
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
