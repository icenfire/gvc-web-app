import { IFBError } from "../../types"
import { AuthActionTypes } from "../../types/actions"

export interface AuthState {
  signInError: IFBError | null
  signUpError: IFBError | null
}

const initState: AuthState = {
  signInError: null,
  signUpError: null,
}

export const authReducer = (
  state: AuthState = initState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case "SIGN_UP":
      console.log("Sign up successful!")
      return state
    case "SIGN_UP_ERROR":
      console.log("Sign up error!")
      console.error(action.payload)
      return { ...state, signUpError: action.payload }
    // return state
    case "MEMBER_PROFILE_CREATED":
      console.log("Member Profile Created Successfully!")
      return state
    case "MEMBER_PROFILE_CREATED_ERROR":
      console.log("Member Profile Creating Error!")
      console.error(action.payload)
      return state
    case "SIGN_IN":
      console.log("Sign in successful!")
      return state
    case "SIGN_IN_ERROR":
      console.log("Sign in error!")
      console.error(action.payload)
      return { ...state, signInError: action.payload }
    case "REMEMBER_ME":
      console.log(
        action.payload
          ? "Login made persistent successful!"
          : "Login made non-persistent successful!"
      )
      return state
    case "REMEMBER_ME_ERROR":
      console.log("Persistence login error!")
      console.error(action.payload)
      return state
    case "SIGN_OUT":
      console.log("Sign out successful!")
      return state
    case "SIGN_OUT_ERROR":
      console.log("Sign out error!")
      console.error(action.payload)
      return state
    default:
      return state
  }
}

// export function authReducer2(
//   state = initState,
//   action: AuthActionTypes
// ): AuthState {
//   return state
// }

// export const authReducer: (
//   state: AuthState,
//   action: AuthActionTypes
// ) => AuthState = (state, action) => {
//   return state
// }

// export const authReducer: (
//   state: AuthState,
//   action: AuthActionTypes
// ) => AuthState = (state = initState, action) => {
//   return state
//   // switch (action.type) {
//   //   case "SIGN_UP":
//   //     console.log("Sign up successful!")
//   //     return state
//   //   case "SIGN_UP_ERROR":
//   //     console.log("Sign up error!")
//   //     console.error(action.payload)
//   //     return { ...state, signUpError: action.payload }
//   //   // return state
//   //   case "MEMBER_PROFILE_CREATED":
//   //     console.log("Member Profile Created Successfully!")
//   //     return state
//   //   case "MEMBER_PROFILE_CREATED_ERROR":
//   //     console.log("Member Profile Creating Error!")
//   //     console.error(action.payload)
//   //     return state
//   //   case "SIGN_IN":
//   //     console.log("Sign in successful!")
//   //     return state
//   //   case "SIGN_IN_ERROR":
//   //     console.log("Sign in error!")
//   //     console.error(action.payload)
//   //     return { ...state, signInError: action.payload }
//   //   case "REMEMBER_ME":
//   //     console.log(
//   //       action.payload
//   //         ? "Login made persistent successful!"
//   //         : "Login made non-persistent successful!"
//   //     )
//   //     return state
//   //   case "REMEMBER_ME_ERROR":
//   //     console.log("Persistence login error!")
//   //     console.error(action.payload)
//   //     return state
//   //   case "SIGN_OUT":
//   //     console.log("Sign out successful!")
//   //     return state
//   //   case "SIGN_OUT_ERROR":
//   //     console.log("Sign out error!")
//   //     console.error(action.payload)
//   //     return state
//   //   default:
//   //     return state
//   // }
// }
