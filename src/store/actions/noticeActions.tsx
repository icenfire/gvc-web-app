import { Dispatch } from "redux"

import { State as INotice } from "./../../components/Level2/NoticeCreator"

export const createNotice = (notice: INotice) => {
  return (dispatch: Dispatch, getState: any, { getFirestore }: any) => {
    const firestore = getFirestore()
    firestore
      .collection("notices")
      .add({ ...notice, createdAt: new Date() })
      .then(() => {
        dispatch({ type: "CREATE_NOTICE", payload: notice })
      })
      .catch((err: any) => {
        dispatch({ type: "CREATE_NOTICE_ERROR", payload: err })
      })
  }
}
