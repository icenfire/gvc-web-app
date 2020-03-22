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
import { useSelector } from "react-redux"
import { IBibleRef } from "src/components/Pages/BiblePage"
import { BibleState } from "src/store/reducers/bibleReducer"
import { AppState } from "src/store/reducers/rootReducer"

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

export interface IPBibleChapterDialog {
  bibleRef: IBibleRef
  setAndUploadBibleRef: (bibleRef: IBibleRef) => void
  openChapter: boolean
  setOpenChapter: (open: boolean) => void
}

export const BibleChapterDialog: FC<IPBibleChapterDialog> = props => {
  const { bibleRef, setAndUploadBibleRef, openChapter, setOpenChapter } = props
  const classes = useStyles()

  const bibleIndex = useSelector<AppState, BibleState["index"]>(
    state => state.bible.index
  )

  const handleClickOpen = () => {
    setOpenChapter(true)
  }

  const handleClose = () => {
    setOpenChapter(false)
  }

  const onClickItem = (i: number) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAndUploadBibleRef({ ...bibleRef, chapter: i })
    // setChapter(i)
    setOpenChapter(false)
  }

  const chaptersArray = () => {
    let out = []
    if (bibleRef.book !== null) {
      for (let i = 1; i <= bibleIndex.totalChapters[bibleRef.book]; i++) {
        out.push(i)
      }
    }
    return out
  }

  return (
    <Fragment>
      <Button onClick={handleClickOpen}>
        {" "}
        {bibleRef.chapter !== null ? `Chapter: ${bibleRef.chapter}` : "Chapter"}
      </Button>

      <Dialog
        open={openChapter}
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
                Choose a Chapter
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container justify="center" alignItems="center" spacing={1}>
            {chaptersArray().map(i => (
              <Grid item key={i}>
                {bibleRef.chapter === i ? (
                  <Button
                    onClick={onClickItem(i)}
                    variant="outlined"
                    color="primary"
                  >
                    {i}
                  </Button>
                ) : (
                  <Button onClick={onClickItem(i)}>{i}</Button>
                )}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
