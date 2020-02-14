export const noticeReducer = (
  state = null,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "CREATE_NOTICE":
      console.log("Created Notice", action.payload)
      return state
    case "CREATE_NOTICE_ERROR":
      console.log("Error whilst creating notice", action.payload)
      return state
    default:
      return state
  }
}
