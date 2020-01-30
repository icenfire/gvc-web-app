import { combineReducers } from "redux"
import { firestoreReducer } from "redux-firestore"

import { authReducer } from "./authReducer"
import { noticeReducer } from "./noticeReducer"

const rootReducer = combineReducers({
  auth: authReducer,
  notice: noticeReducer,
  firestore: firestoreReducer
})

export { rootReducer }
