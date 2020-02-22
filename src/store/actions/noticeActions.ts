import { Dispatch } from "redux"

import { AppActions } from "../../types/actions"
import { INotice } from "./../../types"
import { AppState } from "./../reducers/rootReducer"

export const createNotice = (notice: INotice) => {
  return (
    dispatch: Dispatch<AppActions>,
    getState: () => AppState,
    { getFirestore, getFirebase }: any
  ) => {
    const firestore = getFirestore()
    firestore
      .collection("notices")
      .add({ ...notice, createdAt: new Date() })
      .then(() => {
        dispatch({ type: "CREATE_NOTICE", payload: notice })
      })
      .catch((err: Error) => {
        dispatch({ type: "CREATE_NOTICE_ERROR", payload: err })
      })
  }
}
