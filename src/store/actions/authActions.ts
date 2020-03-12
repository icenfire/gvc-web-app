import { auth } from "../../firebase"
import { IFBError, IMemberUpload, IResetPassword, ISignIn, ISignUp } from "../../types"
import { ThunkActionCustom } from "../../types/actions"

// Sign Up Member
export const signUp = ({
  email,
  password,
  name,
  dob,
  agreeTAndC,
  setSubmitting,
  openAlert: openAlertSignUp,
}: ISignUp): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  setSubmitting(true)
  const firestore = getFirestore()
  const firebase = getFirebase()

  firebase
    .createUser(
      { email, password },
      {
        email,
        username: email,
        name,
        dob,
        cell: "",
        photoUrl: "",
        positions: [],
        agreeTAndC,
      }
    )

    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(value => {
    //     dispatch({ type: "SIGN_UP" })
    //     console.log("Sign up succesful!")

    //     // Create Member Profile
    //     firestore
    //       .collection("members")
    //       .doc(value.user?.uid)
    //       .set({
    //         name,
    //         dob,
    //         cell: "",
    //         positions: [],
    //         agreeTAndC,
    //       })
    .then(() => {
      dispatch({ type: "MEMBER_PROFILE_CREATED" })
      openAlertSignUp()
      setSubmitting(false)
    })
    // .catch((error: IFBError) => {
    //   dispatch({ type: "MEMBER_PROFILE_CREATED_ERROR", payload: error })
    //   console.log(error)
    //   setSubmitting(false)
    // })
    // })
    .catch((error: IFBError) => {
      dispatch({ type: "SIGN_UP_ERROR", payload: error })
      console.log(error)
      setSubmitting(false)
    })
}

// Sign In Member
export const signIn = ({
  email,
  password,
  rememberMe,
  setSubmitting,
}: ISignIn): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  console.log("Before")
  console.log(!!getState().firebase.auth.uid)
  setSubmitting(true)
  console.log("Remember me: ", rememberMe)

  const firebase = getFirebase()

  firebase
    .auth()
    .setPersistence(
      rememberMe ? auth.Auth.Persistence.LOCAL : auth.Auth.Persistence.SESSION // There are some type definition missing on ExtendedFirebaseInstance and so used original auth function from firebase
    )
    .then(() => {
      dispatch({ type: "REMEMBER_ME", payload: rememberMe })
      firebase
        .login({ email, password })
        .then(userCredentials => {
          dispatch({ type: "SIGN_IN" })
          console.log("Sign in succesful!")
        })
        .catch((error: IFBError) => {
          dispatch({ type: "SIGN_IN_ERROR", payload: error })
          console.log(error)
          setSubmitting(false)
          console.log("autherror", getState().firebase.authError)
        })
    })
    .catch((error: IFBError) => {
      dispatch({ type: "REMEMBER_ME_ERROR", payload: error })
      console.log(error)
      setSubmitting(false)
    })
}

// Send reset password link
export const resetPassword = ({
  email,
  setSubmitting,
  openAlert: openAlertResetPassword,
}: IResetPassword): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  setSubmitting(true)
  const firebase = getFirebase()
  firebase
    .resetPassword(email)
    .then(() => {
      console.log("Password reset link sent!")
      dispatch({ type: "RESET_PASSWORD" })
      openAlertResetPassword()
      setSubmitting(false)
    })
    .catch((error: IFBError) => {
      console.log("Password reset link sending error!")
      dispatch({ type: "RESET_PASSWORD_ERROR", payload: error })
      setSubmitting(false)
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
    .logout()
    .then(() => {
      dispatch({ type: "SIGN_OUT" })
    })
    .catch((error: IFBError) => {
      dispatch({ type: "SIGN_OUT_ERROR", payload: error })
      console.log(error)
    })
}

// Edit Profile
export const editProfile = (
  member: IMemberUpload,
  imageFile: File | null,
  setProgress: (progress: number) => void,
  setLoading: (loading: boolean) => void,
  cleanUpAfterSave: () => void
): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firebase = getFirebase()
  const firestore = getFirestore()
  // firebase.updateProfile(member)

  const imageUpdate = (imageFile: File | null) =>
    new Promise(
      (resolve: (photoUrl: string) => void, reject: (error: Error) => void) => {
        if (imageFile) {
          console.log("Uploading Photo!")
          setLoading(true)
          const uploadTask = firebase
            .storage()
            .ref(`profilePhotos/${member.id}`)
            .put(imageFile)
          uploadTask.on(
            "state_changed",
            snapshot => {
              // progrss function ....
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
              setProgress(progress)
            },
            error => {
              // error function ....
              reject(error)
            },
            () => {
              // complete function ....
              firebase
                .storage()
                .ref("profilePhotos")
                .child(member.id)
                .getDownloadURL()
                .then(photoUrl => {
                  resolve(photoUrl)
                })
            }
          )
        } else {
          console.log("Not Uploading Photo!")
          resolve("")
        }
      }
    )

  imageUpdate(imageFile)
    .then(photoUrl => {
      dispatch({ type: "UPLOAD_PHOTO" })
      const memberWithPhotoUrl: IMemberUpload = { ...member, photoUrl }

      firestore
        .collection("members")
        .doc(memberWithPhotoUrl.id)
        .set(memberWithPhotoUrl)
        .then(() => {
          dispatch({ type: "EDIT_PROFILE" })
          console.log("Profile Edited!")
          cleanUpAfterSave()
          setLoading(false)
        })
        .catch((error: IFBError) => {
          dispatch({ type: "EDIT_PROFILE_ERROR", payload: error })
          console.log("Profile Edit Error!", error)
        })
    })
    .catch(error => {
      dispatch({ type: "UPLOAD_PHOTO_ERROR", payload: error })
      console.log("Upload photo error", error)
    })
}
