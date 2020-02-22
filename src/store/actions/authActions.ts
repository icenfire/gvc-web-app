// import { Dispatch } from "redux"

// export const signIn = (email: string, pw: string) => {
//   return (dispatch: Dispatch, { getFirebase }: any) => {
//     const firebase = getFirebase()
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, pw)
//       .then(() => console.log("Login succesful!"))
//       .catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code
//         var errorMessage = error.message
//         // ...
//         console.log(error)
//       })
//     firestore
//       .collection("notices")
//       .add({ ...notice, createdAt: new Date() })
//       .then(() => {
//         dispatch({ type: "CREATE_NOTICE", payload: notice })
//       })
//       .catch((err: any) => {
//         dispatch({ type: "CREATE_NOTICE_ERROR", payload: err })
//       })
//   }
// }
