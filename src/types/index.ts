// ---Members---
export interface IMember {
  id: string
  name: string
  dob: any // dob passed from Firestore is a Timestamp data type which needs to be converted first to Date type
  cell: string
  positions: string[]
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
// Elements
export interface IEmail {
  email: string
}
export interface ISetSubmitting {
  setSubmitting: (isSubmitting: boolean) => void
}
export interface IOpenAlert {
  openAlert: () => void
}
export interface ICredentials extends IEmail {
  password: string
}

// Auth Interface
export interface IResetPassword extends IEmail, ISetSubmitting, IOpenAlert {}
export interface ISignIn extends ICredentials, ISetSubmitting {
  rememberMe: boolean
}
export interface ISignUp extends ICredentials, ISetSubmitting, IOpenAlert {
  name: string
  dob: Date | null
  agreeTAndC: boolean
}

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
