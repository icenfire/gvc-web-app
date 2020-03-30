import { IBibleRef } from "src/components/Pages/BiblePage"
import { BibleActionTypes } from "src/types/actions"

import { bibleIndex, BibleIndex } from "./bibleIndex"

export interface BibleState {
  index: BibleIndex
  ref: {
    translation: IBibleRef["translation"]
    book: number | null
    chapter: number | null
  }
}

const initState = {
  index: bibleIndex,
  ref: {
    translation: "niv" as IBibleRef["translation"],
    book: null,
    chapter: null,
  },
}

export const bibleReducer = (
  state: BibleState = initState,
  actions: BibleActionTypes
): BibleState => {
  switch (actions.type) {
    // case "SET_TRANSLATION":
    //   return state
    // case "SET_TRANSLATION_ERROR":
    //   return state
    // case "SET_BOOK":
    //   return state
    // case "SET_BOOK_ERROR":
    //   return state
    // case "SET_CHAPTER":
    //   return state
    // case "SET_CHAPTER_ERROR":
    //   return state
    case "SET_BIBLE_REFERENCE":
      return state
    case "SET_BIBLE_REFERENCE_ERROR":
      return state
    default:
      return state
  }
}
