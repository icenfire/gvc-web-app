import { ThunkActionCustom } from "../../types/actions"
import { INotice } from "./../../types"

export const createNotice = (notice: INotice): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  const firebase = getFirebase()

  firestore
    .collection("notices")
    .add({ ...notice, createdAt: new Date() })
    .then(() => {
      dispatch({ type: "CREATE_NOTICE", payload: notice })
    })
    .catch((error: Error) => {
      dispatch({ type: "CREATE_NOTICE_ERROR", payload: error })
    })
}
