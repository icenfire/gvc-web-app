import { combineReducers } from "redux"
import { firestoreReducer } from "redux-firestore"

import { authReducer } from "./authReducer"
import { noticeReducer } from "./noticeReducer"
import { stylesReducer } from "./stylesReducer"

export const rootReducer = combineReducers({
  auth: authReducer,
  notice: noticeReducer,
  firestore: firestoreReducer,
  styles: stylesReducer,
})

export type AppState = ReturnType<typeof rootReducer>
