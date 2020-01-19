export const createNotice = (notice: any) => {
  return (dispatch: any, getState: any) => {
    // make async call to database
    dispatch({ type: "CREATE_NOTICE", notice })
  }
}
