export const createNotice = (notice: any) => {
  return (dispatch: any, getState: any, { getFirestore }: any) => {
    const firestore = getFirestore()
    firestore
      .collection("notices")
      .add({ ...notice, createdAt: new Date() })
      .then(() => {
        dispatch({ type: "CREATE_NOTICE", notice })
      })
      .catch((err: any) => {
        dispatch({ type: "CREATE_NOTICE_ERROR", err })
      })
  }
}
