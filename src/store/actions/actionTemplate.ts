// "cta" is a snippet prefix for the template below
import { ThunkActionCustom } from "../../types/actions"

export const createNotice = (): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  const firebase = getFirebase()

  // firestore
  //   .collection("notices")
  //   .add({ ...notice, createdAt: new Date() })
  //   .then(() => {
  //     dispatch({ type: "CREATE_NOTICE", payload: notice })
  //   })
  //   .catch((error: Error) => {
  //     dispatch({ type: "CREATE_NOTICE_ERROR", payload: error })
  //   })
}
