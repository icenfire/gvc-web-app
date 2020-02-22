export interface INotice {
  title: string
  content: string
}

export interface INoticeWithMeta extends INotice {
  id: string
  createdAt: Date
}
