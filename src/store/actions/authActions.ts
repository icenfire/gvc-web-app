import {
  applyExifOrientation,
  base64ToArrayBuffer,
  fileToBase64,
  imageProcessor,
  mirror,
  noop,
  resize,
  rotate,
  sharpen,
} from "ts-image-processor"

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
    .then(() => {
      dispatch({ type: "MEMBER_PROFILE_CREATED" })
      openAlertSignUp()
      setSubmitting(false)
    })
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

interface IPEditProfile {
  member: IMemberUpload
  image: { file: File | null; url: string }
  deleteImage: boolean
  setProgress: (progress: number) => void
  setUpdating: (updating: boolean) => void
  handleClose: () => void
}

// Edit Profile
export const editProfile = ({
  member,
  image,
  deleteImage,
  setProgress,
  setUpdating,
  handleClose,
}: IPEditProfile): ThunkActionCustom<void> => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const firebase = getFirebase()
  const firestore = getFirestore()
  // firebase.updateProfile(member)

  const storageRef = firebase.storage().ref(`profilePhotos/${member.id}`)
  const refThumbnail = storageRef.child("thumbnail")
  const refFull = storageRef.child("full")

  const updatePhoto = (image: IPEditProfile["image"]) =>
    new Promise(
      (
        resolve: (memberWithPhotoUrl: IMemberUpload) => void,
        reject: (error: Error) => void
      ) => {
        if (deleteImage) {
          setUpdating(true)
          // TODO: Delete thumbnail
          const promiseThumbnail = new Promise(
            (
              resThumbnail: () => void,
              rejThumbnail: (errThumbnail: Error) => void
            ) => {
              refThumbnail
                .delete()
                .then(() => {
                  console.log("Thumbnail photo deleted!")
                  resThumbnail()
                })
                .catch((error: IFBError) => {
                  console.log("Thumbnail photo delete error!", error)
                })
            }
          )

          const promiseFull = new Promise(
            (resFull: () => void, rejFull: (errFull: Error) => void) => {
              refFull
                .delete()
                .then(() => {
                  console.log("Full photo deleted!")
                  resFull()
                })
                .catch((error: IFBError) => {
                  console.log("Full photo delete error!", error)
                })
            }
          )

          Promise.all([promiseThumbnail, promiseFull])
            .then(() => {
              console.log("Photo deleted!")
              dispatch({ type: "DELETE_PHOTO" })
              resolve({ ...member, photoUrl: "", thumbnailUrl: "" })
            })
            .catch((error: IFBError) => {
              dispatch({ type: "DELETE_PHOTO_ERROR", payload: error })
              console.log("Photo delete error!", error)
            })
        } else {
          if (image.file) {
            setUpdating(true)

            console.log("Creating thumbnail photo!")

            const imageFile = image.file
            const promiseThumbnail = new Promise(
              (
                resThumbnail: (urlThumbnail: string) => void,
                rejThumbnail: (errThumbnail: Error) => void
              ) => {
                fileToBase64(imageFile).then(base64 => {
                  imageProcessor
                    .src(base64)
                    .pipe(applyExifOrientation())
                    .then(result => {
                      imageProcessor
                        .src(result)
                        .pipe(
                          resize({
                            maxWidth: 75,
                            maxHeight: 75,
                          })
                          // sharpen({
                          //   sharpness: +sharpness / 100,
                          // }),
                        )
                        .then(resultBase64 => {
                          const uploadTaskThumbnail = refThumbnail.put(
                            base64ToArrayBuffer(resultBase64),
                            {
                              // TODO: Either force image conversion to jpeg or get metadata of the original image file
                              contentType: "image/jpeg",
                            }
                          )
                          uploadTaskThumbnail.on(
                            "state_changed",
                            snapshot => {
                              //   // progrss function ....
                              //   const progress = Math.round(
                              //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                              //   )
                              //   setProgress(progress)
                            },
                            errThumbnail => {
                              // error function ....
                              rejThumbnail(errThumbnail)
                            },
                            () => {
                              refThumbnail
                                .getDownloadURL()
                                .then(photoUrl => {
                                  resThumbnail(photoUrl)
                                })
                                .catch((error: IFBError) => {
                                  // dispatch({ type: "DELETE_PHOTO_ERROR", payload: error })
                                  console.log("Photo upload error!", error)
                                })
                            }
                          )
                        })
                    })
                })
              }
            )

            const uploadTaskFull = refFull.put(image.file)
            let promiseFull = new Promise(
              (
                resFull: (photoUrl: string) => void,
                rejFull: (errFull: Error) => void
              ) => {
                uploadTaskFull.on(
                  "state_changed",
                  snapshot => {
                    // progrss function ....
                    const progress = Math.round(
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setProgress(progress)
                  },
                  errFull => {
                    // error function ....
                    rejFull(errFull)
                  },
                  () => {
                    // complete function ....
                    refFull
                      .getDownloadURL()
                      .then(photoUrl => {
                        resFull(photoUrl)
                      })
                      .catch((error: IFBError) => {
                        // dispatch({ type: "DELETE_PHOTO_ERROR", payload: error })
                        console.log("Photo upload error!", error)
                      })
                  }
                )
              }
            )

            Promise.all([promiseThumbnail, promiseFull]).then(Urls => {
              resolve({
                ...member,
                thumbnailUrl: Urls[0],
                photoUrl: Urls[1],
              })
            })

            console.log("Uploading Photo!")
          } else {
            console.log("Not Uploading Photo!")
            resolve(member)
          }
        }
      }
    )

  updatePhoto(image)
    .then(memberWithPhotoUrl => {
      dispatch({ type: "UPLOAD_PHOTO" })

      firestore
        .collection("members")
        .doc(memberWithPhotoUrl.id)
        .set(memberWithPhotoUrl)
        .then(() => {
          dispatch({ type: "EDIT_PROFILE" })
          console.log("Profile Edited!")
          handleClose()
          setUpdating(false)
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
