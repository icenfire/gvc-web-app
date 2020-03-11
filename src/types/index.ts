// ---Members---
export interface IMember {
  id: string
  name: string
  dob: any // dob passed from Firestore is a Timestamp data type which needs to be converted first to Date type
  cell: string
  positions: string[]
  photoUrl: string
}

// ---Notices---
export interface INotice {
  title: string
  content: string
}

export interface INoticeWithMeta extends INotice {
  id: string
  createdAt: Date
}

// ---Prayers---
export interface IPrayer {
  content: string
  id: string
  date: any
  memberId: string
}

// ---Auth---
// Types
export type AuthTypes = {
  email: string
  password: string
  name: string
  dob: Date | null
  photoUrl: string
  rememberMe: boolean
  agreeTAndC: boolean
  page: "signIn" | "signUp" | "resetPassword"
  alertResetPassword: boolean
  alertSignUp: boolean
  setSubmitting: (isSubmitting: boolean) => void
  openAlert: () => void
}

// Auth Interface
export type IResetPassword = Pick<
  AuthTypes,
  "email" | "setSubmitting" | "openAlert"
>
export type ISignIn = Pick<
  AuthTypes,
  "email" | "password" | "rememberMe" | "setSubmitting"
>
export type ISignUp = Pick<
  AuthTypes,
  | "email"
  | "password"
  | "name"
  | "dob"
  | "agreeTAndC"
  | "setSubmitting"
  | "openAlert"
>
export type IAuthForm = Pick<
  AuthTypes,
  | "email"
  | "password"
  | "name"
  | "dob"
  | "rememberMe"
  | "agreeTAndC"
  | "page"
  | "alertResetPassword"
  | "alertSignUp"
>

// export interface IEmail {
//   email: string
// }
// export interface ISetSubmitting {
//   setSubmitting: (isSubmitting: boolean) => void
// }
// export interface IOpenAlert {
//   openAlert: () => void
// }
// export interface ICredentials extends IEmail {
//   password: string
// }

// export interface IResetPassword extends IEmail, ISetSubmitting, IOpenAlert {}
// export interface ISignIn extends ICredentials, ISetSubmitting {
//   rememberMe: boolean
// }
// export interface ISignUp extends ICredentials, ISetSubmitting, IOpenAlert {
//   name: string
//   dob: Date | null
//   agreeTAndC: boolean
// }

// Firebase Error Interface
export interface IFBError {
  code: string
  message: string
}

// ---Pages---
export type Paths =
  | "/"
  | "/auth"
  | "/myaccount"
  | "/prayers"
  | "/members"
  | "/calendar"
  | "/playground"
  | "/public"
  | "/private"
