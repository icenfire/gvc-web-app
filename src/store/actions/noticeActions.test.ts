import { createNotice } from './noticeActions'
//https://www.npmjs.com/package/firestore-jest-mock
//https://redux.js.org/recipes/writing-tests#async-action-creators
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
