import ButtonGroup from "@material-ui/core/ButtonGroup"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { BibleDisplay } from "src/components/Pages/BiblePage/BibleDisplay"
import { AppState } from "src/store/reducers/rootReducer"

import { BibleBookDialog } from "../../Level1/Dialogs/BibleBookDialog"
import { BibleChapterDialog } from "../../Level1/Dialogs/BibleChapterDialog"
import { BibleTranslationDialog } from "../../Level1/Dialogs/BibleTranslationDialog"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

export interface IPBiblePage {}

export const BiblePage: FC<IPBiblePage> = props => {
  const classes = useStyles()
  const [openBook, setOpenBook] = useState<boolean>(false)
  const [openChapter, setOpenChapter] = useState<boolean>(false)
  const [openTranslation, setOpenTranslation] = useState<boolean>(false)

  const [translation, setTranslation] = useState<"niv" | "kor" | "kor_easy">(
    "niv"
  )
  const [book, setBook] = useState<number | null>(null)
  const [chapter, setChapter] = useState<number | null>(null)

  return (
    <Fragment>
      <AppBarMain title="Bible" />
      <ContainerMain>
        <ButtonGroup>
          <BibleTranslationDialog
            translation={translation}
            setTranslation={setTranslation}
            openTranslation={openTranslation}
            setOpenTranslation={setOpenTranslation}
          />
          <BibleBookDialog
            setBook={setBook}
            book={book}
            openBook={openBook}
            setOpenBook={setOpenBook}
            setChapter={setChapter}
            setOpenChapter={setOpenChapter}
            translation={translation}
          />

          {book !== null && (
            <BibleChapterDialog
              book={book}
              chapter={chapter}
              setChapter={setChapter}
              openChapter={openChapter}
              setOpenChapter={setOpenChapter}
            />
          )}
        </ButtonGroup>
        {book !== null && chapter !== null && (
          <BibleDisplay
            book={book}
            chapter={chapter}
            translation={translation}
          />
        )}
      </ContainerMain>
    </Fragment>
  )
}
