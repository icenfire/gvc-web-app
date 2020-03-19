import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { Translation } from "src/components/Level1/Dialogs/BibleTranslationDialog"
import { BibleIndexState } from "src/store/reducers/bibleIndexReducer"
import { AppState } from "src/store/reducers/rootReducer"
import { IBibles } from "src/types"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      padding: 0,
    },
  })
)

export interface IPBibleDisplay {
  book: number
  chapter: number
  translation: Translation
}

export const BibleDisplay: FC<IPBibleDisplay> = ({
  book,
  chapter,
  translation,
}) => {
  const classes = useStyles()

  const bibleIndex = useSelector<AppState, BibleIndexState>(
    state => state.bibleIndex
  )

  const docId = `${String(
    bibleIndex.cumulativeChapters[book] + chapter
  ).padStart(4, "0")}_${translation}`

  useFirestoreConnect([{ collection: "bibles", doc: docId }])

  const reading = useSelector<AppState, IBibles>(
    state => state.firestore.data.bibles && state.firestore.data.bibles[docId]
  )

  return (
    <Fragment>
      {reading &&
        reading.verses.map(v => (
          <Grid container spacing={1}>
            <Grid item xs={1}>
              {v.verse}
            </Grid>
            <Grid item xs>
              {v.text}
            </Grid>
          </Grid>
        ))}
    </Fragment>
  )
}
