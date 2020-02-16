import { Dispatch } from "redux"

export const updateStyle = (style: { styleType: string; value: any }) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: "UPDATE_STYLE", payload: style })
  }
}
