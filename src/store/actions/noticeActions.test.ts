import { createNotice } from './noticeActions'

describe('createNotice action creator', () => {
  it('create response word to state', () => {
    const notice = {
      title: 'new title',
      content: 'new content'
    }
    const dispatch = jest.fn()
    const result = dispatch(createNotice(notice))
    // todo
  })
})
