import { noticeReducer } from './noticeReducer'

test('returns default initial state of `false` when no action is passed', () => {
  const newState = noticeReducer(null, {})
  expect(newState).toBe(null)
})

test('returns state of true upon receiving an action of type `CORRECT_GUESS`', () => {
  const newState = noticeReducer(null, {
    type: 'CREATE_NOTICE',
    payload: {
      title: 'new title',
      content: 'new contnet'
    }
  })
  expect(newState).toBe(null)
})

test('returns state of true upon receiving an action of type `CORRECT_GUESS`', () => {
  const newState = noticeReducer(null, {
    type: 'CREATE_NOTICE_ERROR',
    payload: {
      title: 'new title',
      content: 'new contnet'
    }
  })
  expect(newState).toBe(null)
})
