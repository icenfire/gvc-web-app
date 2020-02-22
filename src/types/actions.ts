import { INotice } from "."

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

export type AppActions = NoticeActionTypes
