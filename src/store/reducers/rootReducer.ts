import { firebaseReducer } from "react-redux-firebase"
import { combineReducers } from "redux"
import { firestoreReducer } from "redux-firestore"

import { appBarReducer } from "./appBarReducer"
import { authReducer } from "./authReducer"
import { bibleReducer } from "./bibleReducer"
import { noticeReducer } from "./noticeReducer"
import { stylesReducer } from "./stylesReducer"

export const rootReducer = combineReducers({
  auth: authReducer,
  bible: bibleReducer,
  notice: noticeReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  styles: stylesReducer,
  appBar: appBarReducer,
})

export type AppState = ReturnType<typeof rootReducer>
