import AppBar from "@material-ui/core/AppBar"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import React, { FC, Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import { AppBarMain } from "src/components/Level1/AppBars/AppBarMain"
import { ContainerMain } from "src/components/Level1/Containers/ContainerMain"
import { BibleDisplay } from "src/components/Pages/BiblePage/BibleDisplay"
import { uploadBibleRef } from "src/store/actions/bibleActions"
import { BibleState } from "src/store/reducers/bibleReducer"
import { AppState } from "src/store/reducers/rootReducer"

import { BibleBookDialog } from "../../Level1/Dialogs/BibleBookDialog"
import { BibleChapterDialog } from "../../Level1/Dialogs/BibleChapterDialog"
import { BibleTranslationDialog } from "../../Level1/Dialogs/BibleTranslationDialog"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      bottom: 0,
    },
  })
)

export interface IPBiblePage {}
export interface IBibleRef {
  translation: "niv" | "nkrv" | "aeb"
  book: number | null
  chapter: number | null
}

export const BiblePage: FC<IPBiblePage> = props => {
  const classes = useStyles()
  const [openTranslation, setOpenTranslation] = useState<boolean>(false)
  const [openBook, setOpenBook] = useState<boolean>(false)
  const [openChapter, setOpenChapter] = useState<boolean>(false)

  const [bibleRef, setBibleRef] = useState<IBibleRef>({
    translation: "niv",
    book: null,
    chapter: null,
  })

  // const [localTranslation, setLocalTranslation] = useState<Translation>(
  //   "niv" as Translation
  // )
  // const [localBook, setLocalBook] = useState<number | null>(null)
  // const [localChapter, setLocalChapter] = useState<number | null>(null)

  const dispatch = useDispatch()

  const uid = useSelector<AppState, string>(state => state.firebase.auth.uid)

  useFirestoreConnect([{ collection: "bibleRefs", doc: uid }])
  const remoteBibleRef = useSelector<AppState, BibleState["ref"]>(
    state =>
      state.firestore.data.bibleRefs && state.firestore.data.bibleRefs[uid]
  )

  // let translation: Translation, book: number | null, chapter: number | null
  // let setTranslation: (translation: Translation) => void,
  //   setBook: (book: number | null) => void,
  //   setChapter: (chapter: number | null) => void

  useEffect(() => {
    if (uid)
      setBibleRef({
        translation: remoteBibleRef?.translation
          ? remoteBibleRef.translation
          : "niv",
        book: remoteBibleRef?.book ? remoteBibleRef.book : null,
        chapter: remoteBibleRef?.chapter ? remoteBibleRef.chapter : null,
      })
  }, [uid, remoteBibleRef])

  const setAndUploadBibleRef = (br: IBibleRef) => {
    if (uid) dispatch(uploadBibleRef(br, uid))
    setBibleRef(br)
  }
  // setTranslation = (translation: Translation) => {
  //   setLocalTranslation(translation)
  // }
  // setBook = (book: number | null) => {
  //   if (uid) dispatch(uploadBibleRef("book", book, uid))
  //   setLocalBook(book)
  // }
  // setChapter = (chapter: number | null) => {
  //   if (uid) dispatch(uploadBibleRef("chapter", chapter, uid))
  //   setLocalChapter(chapter)
  // }

  return (
    <Fragment>
      <AppBarMain title="Bible" />
      <ContainerMain>
        {bibleRef.book !== null && bibleRef.chapter !== null && (
          <BibleDisplay
            translation={bibleRef.translation}
            book={bibleRef.book}
            chapter={bibleRef.chapter}
          />
        )}
      </ContainerMain>
      <AppBar position="sticky" className={classes.footer}>
        <ButtonGroup>
          <BibleTranslationDialog
            bibleRef={bibleRef}
            setAndUploadBibleRef={setAndUploadBibleRef}
            openTranslation={openTranslation}
            setOpenTranslation={setOpenTranslation}
          />
          <BibleBookDialog
            bibleRef={bibleRef}
            setAndUploadBibleRef={setAndUploadBibleRef}
            openBook={openBook}
            setOpenBook={setOpenBook}
            setOpenChapter={setOpenChapter}
          />

          {bibleRef.book !== null && (
            <BibleChapterDialog
              bibleRef={bibleRef}
              setAndUploadBibleRef={setAndUploadBibleRef}
              openChapter={openChapter}
              setOpenChapter={setOpenChapter}
            />
          )}
        </ButtonGroup>
      </AppBar>
    </Fragment>
  )
}
