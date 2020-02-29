import { ExtendedFirestoreInstance, getFirebase } from "react-redux-firebase"
import { ThunkAction } from "redux-thunk"

import { IFBError, INotice } from "."
import { AppState } from "../store/reducers/rootReducer"

// Setup
export type ThunkActionCustom<ReturnType> = ThunkAction<
  ReturnType,
  AppState,
  {
    getFirebase: typeof getFirebase
    // getFirebase: (() => typeof firebase) & typeof getFirebase
    getFirestore: () => ExtendedFirestoreInstance
  },
  AppActions
>

// Notice actions
export const CREATE_NOTICE = "CREATE_NOTICE"
export interface CreateNotice {
  type: typeof CREATE_NOTICE
  payload: INotice
}

export const CREATE_NOTICE_ERROR = "CREATE_NOTICE_ERROR"
export interface CreateNoticeError {
  type: typeof CREATE_NOTICE_ERROR
  payload: Error
}

export type NoticeActionTypes = CreateNotice | CreateNoticeError

// Auth actions
export const SIGN_UP = "SIGN_UP"
export interface SignUp {
  type: typeof SIGN_UP
}

export const SIGN_UP_ERROR = "SIGN_UP_ERROR"
export interface SignUpError {
  type: typeof SIGN_UP_ERROR
  payload: IFBError
}

export const MEMBER_PROFILE_CREATED = "MEMBER_PROFILE_CREATED"
export interface MemberProfileCreated {
  type: typeof MEMBER_PROFILE_CREATED
}

export const MEMBER_PROFILE_CREATED_ERROR = "MEMBER_PROFILE_CREATED_ERROR"
export interface MemberProfileCreatedError {
  type: typeof MEMBER_PROFILE_CREATED_ERROR
  payload: IFBError
}

export const SIGN_IN = "SIGN_IN"
export interface SignIn {
  type: typeof SIGN_IN
}

export const SIGN_IN_ERROR = "SIGN_IN_ERROR"
export interface SignInError {
  type: typeof SIGN_IN_ERROR
  payload: IFBError
}

export const REMEMBER_ME = "REMEMBER_ME"
export interface RememberMe {
  type: typeof REMEMBER_ME
  payload: boolean
}

export const REMEMBER_ME_ERROR = "REMEMBER_ME_ERROR"
export interface RememberMeError {
  type: typeof REMEMBER_ME_ERROR
  payload: IFBError
}

export const SIGN_OUT = "SIGN_OUT"
export interface SignOut {
  type: typeof SIGN_OUT
}

export const SIGN_OUT_ERROR = "SIGN_OUT_ERROR"
export interface SignOutError {
  type: typeof SIGN_OUT_ERROR
  payload: IFBError
}

export type AuthActionTypes =
  | SignUp
  | SignUpError
  | MemberProfileCreated
  | MemberProfileCreatedError
  | SignIn
  | SignInError
  | RememberMe
  | RememberMeError
  | SignOut
  | SignOutError

// All Action types
export type AppActions = NoticeActionTypes | AuthActionTypes
