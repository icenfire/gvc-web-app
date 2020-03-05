import { Dispatch } from "redux"

export const appBarSearchOnChange = (search: string) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: "SEARCH_ON_CHANGE", payload: search })
  }
}
