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
export interface ISignIn {
  email: string
  pw: string
}

export interface ISignUp extends ISignIn {
  name: string
  dob: Date | null
}
