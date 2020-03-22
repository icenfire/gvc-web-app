import { Translation } from "src/components/Level1/Dialogs/BibleTranslationDialog"

import { ThunkActionCustom } from "../../types/actions"
import { IBibleRef } from "./../../components/Pages/BiblePage"

// // Set Translation
// export const updateTranslation = (
//   translation: Translation,
//   uid: string
// ): ThunkActionCustom<void> => (
//   dispatch,
//   getState,
//   { getFirestore, getFirebase }
// ) => {
//   const firestore = getFirestore()

//   firestore
//     .collection("bibleRefs")
//     .doc(uid)
//     .set({ translation }, { merge: true })
//     .then(() => {
//       console.log("Translation set!")
//       dispatch({ type: "SET_TRANSLATION" })
//     })
//     .catch(error => {
//       console.log("Translation set error!")
//       dispatch({ type: "SET_TRANSLATION_ERROR", payload: error })
//     })
// }

// // Set Book
// export const updateBook = (
//   book: number | null,
//   uid: string
// ): ThunkActionCustom<void> => (
//   dispatch,
//   getState,
//   { getFirestore, getFirebase }
// ) => {
//   const firestore = getFirestore()

//   firestore
//     .collection("bibleRefs")
//     .doc(uid)
//     .set({ book }, { merge: true })
//     .then(() => {
//       console.log("Book set!")
//       dispatch({ type: "SET_BOOK" })
//     })
//     .catch(error => {
//       console.log("Book set error!")
//       dispatch({ type: "SET_BOOK_ERROR", payload: error })
//     })
// }

// // Set Chapter
// export const updateChapter = (
//   chapter: number | null,
//   uid: string
// ): ThunkActionCustom<void> => (
//   dispatch,
//   getState,
//   { getFirestore, getFirebase }
// ) => {
//   const firestore = getFirestore()

//   firestore
//     .collection("bibleRefs")
//     .doc(uid)
//     .set({ chapter }, { merge: true })
//     .then(() => {
//       console.log("Chapter set!")
//       dispatch({ type: "SET_CHAPTER" })
//     })
//     .catch(error => {
//       console.log("Chapter set error!")
//       dispatch({ type: "SET_CHAPTER_ERROR", payload: error })
//     })
// }

// Set Bible Reference
export const uploadBibleRef = (
  bibleRef: IBibleRef,
  uid: string
): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()

  firestore
    .collection("bibleRefs")
    .doc(uid)
    .set(bibleRef, { merge: true })
    .then(() => {
      console.log("Bible reference set!")
      dispatch({ type: "SET_BIBLE_REFERENCE" })
    })
    .catch(error => {
      console.log("Bible reference set error!")
      dispatch({ type: "SET_BIBLE_REFERENCE_ERROR", payload: error })
    })
}
