import { noticeReducer } from './noticeReducer'

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
      name: 'error string',
      message: 'create notice error',
      stack: 'stack'
    }
  })
  expect(newState).toBe(null)
})
