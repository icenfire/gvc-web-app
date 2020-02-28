// Notices
export interface INotice {
  title: string
  content: string
}

export interface INoticeWithMeta extends INotice {
  id: string
  createdAt: Date
}

// Auth
export interface ICredentials {
  email: string
  pw: string
}

export interface ISignIn extends ICredentials {
  rememberMe: boolean
}

export interface ISignUp extends ICredentials {
  name: string
  dob: Date | null
  agreeTAndC: boolean
}
