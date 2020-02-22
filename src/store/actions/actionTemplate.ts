import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"

export const actionTemplate = () => {
  return (
    dispatch: Dispatch,
    getState: any,
    { getFirestore, getFirebase }: { getFirestore: any; getFirebase: any }
  ) => {
    dispatch({ type: "ACTION_TYPE", payload: "PAYLOAD" })
  }
}
