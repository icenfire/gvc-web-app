import { INotice } from "."

// Notice actions
export const CREATE_NOTICE = "CREATE_NOTICE"
export const CREATE_NOTICE_ERROR = "CREATE_NOTICE_ERROR"

export interface CreateNoticeAction {
  type: typeof CREATE_NOTICE
  payload: INotice
}

export interface CreateNoticeErrorAction {
  type: typeof CREATE_NOTICE_ERROR
  payload: any
}

export type NoticeActionTypes = CreateNoticeAction | CreateNoticeErrorAction

// Auth actions
export const SIGN_IN_AUTH = "SIGN_IN_AUTH"
export const SIGN_UP_AUTH = "SIGN_UP_AUTH"

export interface SignInAuth {
  type: typeof SIGN_IN_AUTH
}

export type AppActions = NoticeActionTypes
