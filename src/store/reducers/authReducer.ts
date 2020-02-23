import { AuthActionTypes } from "../../types/actions"

const initState = {
  error: null,
}

export const authReducer = (state = initState, action: AuthActionTypes) => {
  switch (action.type) {
    case "SIGN_UP":
      console.log("Sign up successful!")
      return state
    case "SIGN_UP_ERROR":
      console.log("Sign up error!")
      console.error(action.payload)
      return state
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
