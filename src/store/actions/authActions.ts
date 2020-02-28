import { ISignIn, ISignUp } from "../../types"
import { ThunkActionCustom } from "../../types/actions"

// Sign Up Member
export const signUp = ({
  email,
  pw,
  name,
  dob,
  agreeTAndC,
}: ISignUp): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore()
  const firebase = getFirebase()

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pw)
    .then(value => {
      dispatch({ type: "SIGN_UP" })
      console.log("Sign up succesful!")

      // Create Member Profile
      firestore
        .collection("members")
        .doc(value.user?.uid)
        .set({
          name,
          dob,
          cell: "",
          positions: [],
          agreeTAndC,
        })
        .then(() => {
          dispatch({ type: "MEMBER_PROFILE_CREATED" })
        })
        .catch((error: Error) => {
          dispatch({ type: "MEMBER_PROFILE_CREATED_ERROR", payload: error })
          console.log(error)
        })
    })
    .catch((error: Error) => {
      dispatch({ type: "SIGN_UP_ERROR", payload: error })
      console.log(error)
    })
}

// Sign In Member
export const signIn = ({
  email,
  pw,
  rememberMe,
}: ISignIn): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  // TODO Implement remember me
  console.log("Remember me: ", rememberMe)
  const firebase = getFirebase()
  firebase
    .auth()
    .signInWithEmailAndPassword(email, pw)
    .then(() => {
      dispatch({ type: "SIGN_IN" })
      console.log("Sign in succesful!")
    })
    .catch((error: Error) => {
      dispatch({ type: "SIGN_IN_ERROR", payload: error })
      console.log(error)
    })
}

// Sign Out Member
export const signOut = (): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firebase = getFirebase()

  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "SIGN_OUT" })
    })
    .catch((error: Error) => {
      dispatch({ type: "SIGN_OUT_ERROR", payload: error })
      console.log(error)
    })
}
