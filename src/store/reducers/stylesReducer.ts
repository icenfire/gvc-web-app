export const stylesReducer = (
  state = {},
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "UPDATE_STYLE":
      return { ...state, [action.payload.styleType]: action.payload.value }
    default:
      return state
  }
}
